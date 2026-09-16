import React, {useState} from 'react';
import SearchBar from '../../common/SearchBar';

function Home() {

    const [query, setQuery] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        console.log('Searching for:', query);
    }

    return (

        <div className = 'Home'>
            <form className = "Search-Bar">
            </form>
        </div>

    );

}

export default Home;