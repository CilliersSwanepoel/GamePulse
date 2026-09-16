import React, {useState} from 'react';

function SearchBar({value, onChange, onSubmit, placeholder = "Search..."}) {

function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(value);
}

    return(

        <form className = "SearchBar-container" onSubmit={handleSubmit}>
            <input 
            className='SearchBar-input' 
            value={value}
            onChange={ (e) => onChange(e.target.value)}
            placeholder={placeholder}
            />
        </form>

    );
}

export default SearchBar;