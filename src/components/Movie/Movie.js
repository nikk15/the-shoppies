import React from 'react';
import './Movie.scss';

function Movie(props){
    return (
        <li className="movie">
            <img className="movie__poster" src={props.poster} alt='Film poster'/>
            <h3 className="movie__title">{props.title}</h3>
            <p className="movie__year">{props.year}</p>
            <button 
                onClick={() => props.nominationHandler(props.key)}
                className="movie__nominate button"
            >
                Nominate
            </button>
        </li>
    )
    
}

export default Movie;