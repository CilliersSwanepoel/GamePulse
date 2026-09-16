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
            <SearchBar />
        </div>

    );

}

export default Home;