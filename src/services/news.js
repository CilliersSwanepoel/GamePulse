const RSS_FEED_URL = 'https://www.pcgamer.com/rss/';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`;

export async function getLatestNews() {

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`News request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.items;
}
