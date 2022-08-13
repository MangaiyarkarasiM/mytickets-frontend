import React from 'react';
import Theater from '../Theaters/Theater'

function TheaterList(props) {
    return (
        <>
            { 
              props.theaters.map((theater,index)=>{
                  return <Theater key={index} theater={theater}/>
              })
            }
        </>
    );
}

export default TheaterList;