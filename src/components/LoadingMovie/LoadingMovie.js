import React from 'react';
import './LoadingMovie.scss';

function LoadingMovie(props){
    return (
        <li className="loading">
            <div className="loading__poster"></div>
            <div className="loading__details">
                <div className="loading__title"></div>
                <div className="loading__year"></div>
            </div>
            <div className="loading__button"></div>
        </li>
    )
    
}

export default LoadingMovie;