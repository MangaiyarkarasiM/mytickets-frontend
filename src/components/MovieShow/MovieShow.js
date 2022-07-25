import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import fetchApi from '../../utils/fetchApi';
import Layout from '../Layout/Layout';
import Show from '../Show/Show';

function MovieShow(props) {
    const [shows,setShows] = useState([]);
    let [theaters, setTheaters] = useState([]);
    let {id} = useParams();

    useEffect(()=>{
        getShows();
    },[id]);

    async function getShows(){
        let res = await fetchApi.get(`/shows/${id}`);
        //console.log(res)
        if(res.data.statusCode)
        {
            setShows(res.data.shows);
            getTheater(res.data.shows);
        }
    }
    
    async function getTheater(show)
    {
        let res = await fetchApi.get('/theaters');
        //console.log(res.data);
        if(res.data.statusCode === 200)
        {
            let theater=res.data.theaters.filter((theater)=>{
                let avail=false
                show?.forEach((s)=>{
                    avail= s.theaterID===theater._id;
                })
                return avail;
            }).map((theater)=>{
                show?.forEach((s)=>{
                    if(s.theaterID===theater._id)
                    {
                        theater.shows.push(s._id)
                    } 
                })
                return theater;
            });
            //console.log(theater);
            setTheaters(theater);
        }
        else
        {
            console.log(res.data);
        }
    }

    return (
        <div>
            <Layout/>
            <div className='row'>
                {
                    theaters.map((theater)=>{
                        return <Show theater={theater} shows={shows}>{theater.name}</Show>
                    })
                }
            </div>
        </div>
    );
}

export default MovieShow;