import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return (
        <div className="d-flex mt-5 align-items-start flex-column justify-content-start bg-info">
            <div className='mt-4 ml-3'>
                ©️ 2022 Book Your Show
            </div>
            <div className='d-flex align-items-start justify-content-start'>
            <div className='mx-3 my-3'>
                <Link to='#' className='footer-item'>About us</Link>
            </div>
            <div className='vl'></div>
            <div className='mx-3 my-3'>
                <Link to='#' className='footer-item'>Customer Care</Link>
            </div>
            <div className='vl'></div>
            <div className='mx-3 my-3'>
                <Link to='#' className='footer-item'>Feedback</Link>
            </div>
            </div>
        </div>
    );
}

export default Footer;