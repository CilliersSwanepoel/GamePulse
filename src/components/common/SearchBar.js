import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, onSubmit, placeholder = "Search..." }) {

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit?.(value);
    }

    function handleIconClick(e) {
        if (value) {
            e.preventDefault();
            onChange('');
        }
    }

    return (

        <form className="SearchBar-container" onSubmit={handleSubmit}>
            <button
                type="submit"
                className="SearchBar-icon"
                aria-label={value ? "Clear search" : "Search"}
                onClick={handleIconClick}
            >
                <span className="SearchBar-icon-glass" />
            </button>
            <input
                className="SearchBar-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </form>

    );
}

export default SearchBar;
