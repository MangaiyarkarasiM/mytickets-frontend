import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {MovieContext} from '../../context/movieContext';
import { GlobalContext } from "../../context/globalContext";
import './Movie.css';

function Movie(props) {
    const { user } = useContext(GlobalContext);
    const {deleteMovie,setShowEdit,setId} = useContext(MovieContext);

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-4 p-0">
        <div
          className="card justify-content-center pb-2"
          style={{ width: "13rem", backgroundColor: "#f0f2f5", border: "none" }}
        >
            <Link to={`/movies/${props.movie._id}`} className="cardstyle">
            <img src={props.movie.posterUrl} className="card-img-top" alt={props.movie.name} style={{minHeight:"20rem", maxHeight:"20rem"}}/>
             <div className="card-body p-0 p-1">
            
              <div className="title">
                <div className="font-weight-bold text-dark mb-2" style={{fontSize:'1.3rem'}}>
                {props.movie.name}
                </div>
              </div>
              <div className="font-weight-bold text-secondary overflow mb-2">
                  {props.movie.languages.toString()}
                </div>
              <div className='d-flex justify-content-between mb-2'>
                <div className="font-weight-bold text-secondary">
                  {props.movie.cert}
                </div>
                <div className="font-weight-bold text-secondary">
                  ⭐{props.movie.rating}
                </div>
              </div>
          </div>
          </Link>
          {user.role === "admin" ? (
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-outline-warning py-1 px-2"
                  onClick={() => {
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    setShowEdit(true);
                    setId(props.movie._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger py-1 px-2"
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