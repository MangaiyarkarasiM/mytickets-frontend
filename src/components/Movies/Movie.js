import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {MovieContext} from '../../context/movieContext';
import './Movie.css'

function Movie(props) {
    const [role,setRole] = useState('');

    useEffect(()=>{
        const ss = sessionStorage.getItem('role');
        setRole(ss);
    },[])
    //console.log(props)
    const {deleteMovie,setShowEdit,setId} = useContext(MovieContext);

    return (
      <div className="col-lg-4 col-md-6 col-sm-12 col-xl-3 mr-4 mb-4">
        <div
          className="card my-4 mx-4 justify-content-center p-2"
          style={{ width: "18rem" }}
        >
            <Link to={`/movies/${props.movie._id}`} className="cardstyle">
             <div className="card-body">
            
              <div className="title">
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  Name: {props.movie.name}
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  {props.movie.genre}
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  {props.movie.cert}
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  {props.movie.rating}
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  {props.movie.cast}
                </div>
              </div>
              <div>
                <div className="font-weight-bold text-uppercase text-secondary mb-2">
                  {props.movie.duration}
                </div>
              </div>
            
            
            
          </div>
          </Link>
          {role === "admin" ? (
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning py-1 px-2 mr-4"
                  onClick={() => {
                    setShowEdit(true);
                    setId(props.movie._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger py-1 px-2"
                  onClick={() => {
                    deleteMovie(props.movie._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
        </div>
      </div>
    );
}

export default Movie;