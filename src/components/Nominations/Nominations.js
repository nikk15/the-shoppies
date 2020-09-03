import React from 'react';
import './Nominations.scss';
import Movie from '../Movie';

function Nominations(props){
    return (
        <section className="nominations">
            <h2 className="nominations__header">Your Nominations:</h2>
            {!!props.nominations.length && <ul className="nominations__list">
                {props.nominations.map(movie=>{
                    return <Movie 
                        poster={movie.Poster}
                        title={movie.Title}
                        year={movie.Year}
                        key={movie.imdbID}
                        movie={movie}
                        nominationHandler={props.nominationHandler}
                        class={'remove'}
                        enabled={true}              
                    />
                })}
            </ul>}
        </section>
    )
}

export default Nominations;