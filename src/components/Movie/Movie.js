import React from 'react';
import './Movie.scss';
import Button from '../Button';
import trophy from '../../assets/goal.svg';

function Movie(props){
    return (
        <li className="movie">
            <img 
                className={props.poster==='N/A' ? "movie__trophy" : "movie__poster"} 
                src={props.poster==='N/A' ? trophy : props.poster} 
                alt={props.poster==='N/A' ? 'trophy' : "Poster"}
            />
            <div className="movie__details">
                <h3 className="movie__title">{props.title}</h3>
                <p className="movie__year">{props.year}</p>
            </div>
            <Button 
                nominationHandler={props.nominationHandler}
                class={props.class}
                enabled={props.enabled}
                movie={props.movie}
            />
        </li>
    )
    
}

export default Movie;