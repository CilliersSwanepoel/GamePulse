const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = process.env.REACT_APP_RAWG_KEY;

export async function searchGames(query) {
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching games: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
}