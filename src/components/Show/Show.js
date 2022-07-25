import React from 'react';

function Show(props) {
    return (
        <div className='col-sm-12 col-md-12 col-lg-12 col-lg-12'>
            <div className='my-3 py-2 d-flex bg-white border rounded flex-row justify-content-around'>
            <h3>{props.children}</h3>
            {
                props.shows?.map((show,index)=>{
                    let time= new Date(`${show.date}`);
                    let ar=show.startTime.split(':').map(Number);
                    let timing = time.getTime()+((ar[0]-5)*60*60*1000)+(ar[1]*60*1000)-((30*60*1000));
                    time.setTime(timing)
                    return <div key={index}>
                        <button className="btn btn-info" type="button" onClick={()=>{}}>{time.getHours()} : {time.getMinutes()=='0'?'00':time.getMinutes()}</button>
                        </div>
                })
            }
        </div>
        </div>
    );
}

export default Show;