import React from 'react';
import './Banner.scss';
import envelope from '../../assets/mail.svg';

function Banner(props){
    return (
        <header className="banner">
            <img className='banner__icon' src={envelope} alt='envelope' />
            <div className='banner__details'>
                <h2 className='banner__header'>And the nominees are...</h2>
                <p>
                    {props.nominees.map((nominee, i) => {
                        return <span key={nominee.imdbID} className={`banner__nominee--${i}`}>
                            {i !== 4 ? `${nominee.Title}, `: nominee.Title}
                        </span>
                    })}
                </p>
            </div>
        </header>
    )
    
}

export default Banner;