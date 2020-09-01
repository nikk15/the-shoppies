import React from 'react';
import './Nominations.scss';
import Movie from '../Movie';

function Nominations(props){
    return (
        <section className="nominations">
            <h2 className="nominations__header">Your Nominations:</h2>
            <ul className="nominations__list">
                <Movie />
            </ul>
        </section>
    )
}

export default Nominations;