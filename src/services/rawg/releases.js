import { BASE_URL, API_KEY } from './rawg';

export async function getUpcomingGames() {
    const today = new Date().toISOString().split('T')[0];
    const threeMonthsOut = new Date();
    threeMonthsOut.setMonth(threeMonthsOut.getMonth() + 3);
    const futureDate = threeMonthsOut.toISOString().split('T')[0];

    const url = `${BASE_URL}/games?key=${API_KEY}&dates=${today},${futureDate}&ordering=released&page_size=10`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching upcoming games: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
}
