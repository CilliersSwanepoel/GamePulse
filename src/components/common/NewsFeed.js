import React from 'react';
import './NewsFeed.css';

function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
}

function formatDate(pubDate) {
    if (!pubDate) return '';
    return new Date(pubDate).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
}

function NewsFeed({ articles }) {
    if (!articles.length) return null;

    const [featured, ...rest] = articles;

    return (
        <section className="NewsFeed">
            <h2 className="NewsFeed-heading">Latest News</h2>

            <a
                className="NewsFeed-featured"
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundImage: `url(${featured.thumbnail})` }}
            >
                <div className="NewsFeed-featured-overlay">
                    <span className="NewsFeed-date">{formatDate(featured.pubDate)}</span>
                    <p className="NewsFeed-featured-title">{featured.title}</p>
                    <p className="NewsFeed-featured-snippet">
                        {stripHtml(featured.description).slice(0, 140)}...
                    </p>
                </div>
            </a>

            <div className="NewsFeed-grid">
                {rest.map((article) => (
                    <a
                        className="NewsFeed-card"
                        key={article.guid}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {article.thumbnail && (
                            <div className="NewsFeed-thumb-wrap">
                                <img
                                    className="NewsFeed-thumb"
                                    src={article.thumbnail}
                                    alt={article.title}
                                />
                            </div>
                        )}
                        <div className="NewsFeed-card-body">
                            <span className="NewsFeed-date">{formatDate(article.pubDate)}</span>
                            <p className="NewsFeed-title">{article.title}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export default NewsFeed;
