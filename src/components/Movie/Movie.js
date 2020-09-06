import React, { useState, useEffect, useRef } from 'react';
import './Movie.scss';
import Button from '../Button';
import trophy from '../../assets/goal.svg';

function Movie(props){
    const [onRemove, setOnRemove] = useState('');
    let refRemove = useRef()

    const handleNomination = (movie) => {
        if(props.class==='remove'){
            setOnRemove(' movie--remove')
        } else {
            props.nominationHandler(movie)
        }
    }

    useEffect(() => {
        if(onRemove){
            let id  = setTimeout(()=> {
                props.nominationHandler(props.movie)
            }, 400)
            refRemove.current = id;
            return () => clearTimeout(refRemove.current)
        }
    }, [onRemove])

    return (
        <li className={`movie${props.added ? ' movie--added' : ''}${onRemove}`}>
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
                nominationHandler={() => handleNomination(props.movie)}
                class={props.class}
                enabled={props.enabled}
                movie={props.movie}
            />
        </li>
    )
    
}

export default Movie;