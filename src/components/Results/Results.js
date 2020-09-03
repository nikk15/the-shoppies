import React from 'react';
import './Results.scss';
import Movie from '../Movie';

function Results(props){
    return (
        <section className="results">
            <h2 className="results__header">Movies: </h2>
            {!!props.results.length && <ul className="results__list">
                {props.results.map(movie=>{
                    return <Movie 
                        poster={movie.Poster}
                        title={movie.Title}
                        year={movie.Year}
                        key={movie.imdbID}
                        movie={movie}
                        nominationHandler={props.nominationHandler}
                        class={'nominate'}
                        enabled={movie.nominated || props.complete ? false : true}            
                    />
                })}
            </ul>}
        </section>
    )
}

export default Results;