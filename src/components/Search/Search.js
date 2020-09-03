import React from 'react';
import './Search.scss';
import popcorn from '../../assets/cinema.svg';

function Search(props){
    return (
        <header className="search">
            <img className="search__icon" src={popcorn} alt='popcorn' />
            <div className="search__details">
                <h2 className="search__label">Find a movie to nominate: </h2>
                <form>
                    <input 
                        className="search__input" 
                        name="search" 
                        onChange={(e) => props.searchHandler(e.target.value)}
                    />
                </form>
            </div>
        </header>
    )
}

export default Search;