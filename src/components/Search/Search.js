import React from 'react';
import './Search.scss';

function Search(props){
    return (
        <header className="search">
            <h2 className="search__label">Find a movie to nominate: </h2>
            <form>
                <input 
                    className="search__input" 
                    name="search" 
                    onChange={(e) => props.searchHandler(e.target.value)}
                />
            </form>
        </header>
    )
}

export default Search;