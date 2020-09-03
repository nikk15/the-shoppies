import React from 'react';
import './Banner.scss';
import envelope from '../../assets/mail.svg';

function Banner(props){
    return (
        <header className="banner">
            <img className='banner__icon' src={envelope} alt='envelope' />
            <div className='banner__details'>
                <h2>And the nominees are...</h2>
                <p>
                    {props.nominees.map(nominee => {
                        return nominee.Title;
                    }).join(', ')}
                </p>
            </div>
        </header>
    )
    
}

export default Banner;