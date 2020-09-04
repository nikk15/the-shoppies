import React from 'react';
import './Search.scss';
import popcorn from '../../assets/cinema.svg';

function Search(props){
    return (
        <header className="search">
            <img className="search__icon" src={popcorn} alt='popcorn' />
            <div className="search__details">
                <h1 className="search__header">The Shoppies</h1>
                <form>
                    <input 
                        placeholder="Find a movie to nominate..."
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