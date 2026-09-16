import React, {useState} from 'react';
import './Home.css';
import SearchBar from '../../common/SearchBar';

function Home() {

    const [query, setQuery] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        console.log('Searching for:', query);
    }

    return (

        <div className = 'Home'>
            <div className='Home-search'>
                <SearchBar/>
            </div>
        </div>

    );

}

export default Home;