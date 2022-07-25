import React,{ useState, useContext, useEffect } from 'react';
import {MovieContext} from '../../context/movieContext';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const movieFormValidation = Yup.object().shape({
    name: Yup.string().required('Enter movie name'),
    genre: Yup.string().required('Enter genre'),
    cert: Yup.string().required('Enter cert of the movie'),
    rating: Yup.number(),
    cast: Yup.string().required('Enter cast'),
    duration: Yup.number().required('Enter duration'),
  })

function MovieForm(props) {
    //console.log(props)
    const {movies, editMovie, addMovie,setShowEdit,setId} = useContext(MovieContext);
    const [movie,setMovie] = useState({});
    const [userID,setUserID] = useState('');
    useEffect(()=>{
        //console.log(movies);
        let mov = movies?.filter((m)=> m._id===props.id);
         if(mov?.length>0){
            let m={...mov};
            m[0].cast = typeof m[0].cast === 'object'? m[0].cast.join(','):m[0].cast ;
            m[0].genre = typeof m[0].genre === 'object'? m[0].genre.join(','):m[0].genre;
             setMovie(m[0])};
        },[props.id])

    useEffect(()=>{
        const ss = sessionStorage.getItem('userID');
        setUserID(ss);
    },[])

    const onAddMovie = (value) => {
        //console.log(value);
        if(props.id)
        {
            let input={...value};
            if(input.genre.indexOf(','))
            {
              input.genre = input.genre.split(",")
            }
            if(input.cast.indexOf(','))
            {
              input.cast = input.cast.split(",")
            }
            console.log(input);
            editMovie({...value, _id: props.id, addedBy: userID });
            setShowEdit(false);
            setId('')
       }
       else{
        
        addMovie({...value, addedBy: userID });
        setShowEdit(false)
       }
        };

    return (
        <div className='bg-white rounded p-4 my-3'>
            <Formik
        initialValues={{
            name: movie? movie.name:'',
            genre: movie? movie.genre:'',
            cert: movie? movie.cert:'',
            rating: movie? movie.rating:'',
            cast: movie? movie.cast:'',
            duration: movie? movie.duration:'',
            country: movie? movie.country:''
        }}
        onSubmit={onAddMovie}
        validationSchema={movieFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="d-flex flex-column align-items-center justify-conetent-center border-info rounded mt-3">
              <div className="mb-4">
                <label className="d-block font-weight-bold">Movie name</label>
                <Field name="name" type="text" value={prop.values.name} className="d-block rounded form-control" placeholder="Movie name" size='50'/>
                <ErrorMessage
                  name="name"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Genre</label>
                <Field name="genre" type="text" value={prop.values.genre} className="d-block rounded form-control" placeholder="Genre of the movie" size='50'/>
                <small className="d-block text-muted">Multiple genres can be added separated by comma(,)</small>
                <ErrorMessage
                  name="genre"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Certified</label>
                <Field name="cert" type="text" value={prop.values.cert} className="d-block rounded form-control" placeholder="Certification eg: UA, U" size='50'/>
                <ErrorMessage
                  name="cert"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Rating</label>
                <Field name="rating" type="text" value={prop.values.rating} className="d-block rounded form-control" placeholder="Rating" size='50'/>
                <ErrorMessage
                  name="rating"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Cast and Crew</label>
                <Field name="cast" type="text" value={prop.values.cast} className="d-block rounded form-control" placeholder="Cast" size='50'/>
                <small className="d-block text-muted">Multiple cast names can be added separated by comma(,)</small>
                <ErrorMessage
                  name="cast"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Duration</label>
                <Field name="duration" type="text" value={prop.values.duration} maxLength='3' className="d-block rounded form-control" placeholder="Duration of the movie" size='50'/>
                <ErrorMessage
                  name="duration"
                  render={(msg) => <small className="d-block text-danger">{msg}</small>}
                />
              </div>
              <div className="d-flex justify-content-between">
                    {props.id? <button type='submit' className="btn btn-primary mr-4">Update</button>
                    : <button type='submit' className="btn btn-primary mr-4" >Add</button>}
                    
                    <button type='button' className="btn btn-warning" onClick={()=>{setShowEdit(false); setId('')}}>Cancel</button>
                </div>
            </Form>
          );
        }}
      </Formik>

        </div>
    );
}

export default MovieForm;