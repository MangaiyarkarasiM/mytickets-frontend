import React from 'react';
import Theater from '../Theaters/Theater'

function TheaterList(props) {
    return (
        <div className="row">
            { 
              props.theaters.map((theater,index)=>{
                  return <Theater key={index} theater={theater}/>
              })
            }
        </div>
    );
}

export default TheaterList;