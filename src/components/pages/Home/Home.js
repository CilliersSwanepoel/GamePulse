import React, {useState, useEffect} from 'react';
import './Home.css';
import SearchBar from '../../common/SearchBar';
import { searchGames } from '../../../services/rawg/rawg';
import NewsFeed from '../../common/NewsFeed';
import { getLatestNews } from '../../../services/news';
import UpcomingReleases from '../../common/UpcomingReleaseFeed';
import { getUpcomingGames } from '../../../services/rawg/releases';

function Home() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch(searchTerm) {
        setIsLoading(true);
        setError(null);

        try {
            const games = await searchGames(searchTerm);
            setResults(games);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }


    }

    useEffect(() => {
        if  (!query.trim()) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch(query);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const [news, setNews] = useState([]);

    useEffect(() => {
        getLatestNews()
            .then(setNews)
            .catch((err) => console.error(err));
    }, []);

    const [upcoming, setUpcoming] = useState([]);

useEffect(() => {
    getUpcomingGames()
        .then(setUpcoming)
        .catch((err) => console.error(err));
}, []);

    return (

    <div className='Home'>
        <div className='Home-search'>
            <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSearch}
            />
        </div>

    {query.trim() && (
        <>

        {isLoading && <p className="Home-status">Loading...</p>}
        {error && <p className="Home-status Home-status--error">{error}</p>}

        <div className="Home-results">
            {results.slice(0, 8).map((game) => (
                <div className="Home-results-card" key={game.id}>
                    {game.background_image && (
                        <img
                            className="Home-results-thumb"
                            src={game.background_image}
                            alt={game.name}
                        />
                    )}
                    <p>{game.name}</p>
                </div>
            ))}
        </div>
        </>
    )}

        <NewsFeed articles={news} />
        <UpcomingReleases games={upcoming} heading="Coming Soon" />
    </div>

    );

}

export default Home;
