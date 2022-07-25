import React, { useContext } from 'react';
import {TheaterContext} from '../../context/theaterContext'

function Theater(props) {
    //console.log(props)
    const {deleteTheater,setShowEdit,setId} = useContext(TheaterContext);

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 col-xl-3 mr-4 mb-4"> 
            <div className="card my-4 mx-4 justify-content-center" style={{width:"18rem"}}>
                <div className="card-body">
                    <div className="title">
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.name}</div>
                    </div>
                    <div >
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.addressLine1}</div>
                    </div>
                    <div >
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.addressLine2}</div>
                    </div>
                    <div >
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.city}</div>
                    </div>
                    <div >
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.state}</div>
                    </div>
                    <div >
                        <div className="font-weight-bold text-uppercase text-secondary mb-2">{props.theater.pincode} - {props.theater.country}</div>
                    </div>
                    <div className='d-flex justify-content-between'> 
                        <button className="btn btn-warning py-1 px-2 mr-4" onClick={()=>{setShowEdit(true); setId(props.theater._id)}}>Edit</button>
                        <button className="btn btn-danger py-1 px-2" onClick={()=>{deleteTheater(props.theater._id)}}>Delete</button>
                    </div>                    
                </div>            
            </div>
            
        </div>
    );
}

export default Theater;