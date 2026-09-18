import React from 'react';
import './UpcomingReleaseFeed.css';

function formatDate(dateStr) {
    if (!dateStr) return 'TBA';
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
}

function daysUntil(dateStr) {
    if (!dateStr) return null;

    const releaseDate = new Date(dateStr);
    const today = new Date();

    releaseDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.round((releaseDate - today) / msPerDay);

    return diff >= 0 ? diff : null;
}

function platformNames(game) {
    if (!game.platforms) return '';
    return game.platforms
        .slice(0, 3)
        .map((p) => p.platform.name)
        .join(' · '); // middle-dot separator, e.g. "PC · PS5 · Xbox"
}

// N placeholder cards shown while the real data is still loading, so
// the layout doesn't jump from "empty" to "full" once the fetch
// resolves -- the shimmer itself is pure CSS (see UpcomingReleaseFeed.css)
function SkeletonRow({ count = 5 }) {
    return (
        <div className="UpcomingReleaseFeed-row">
            {Array.from({ length: count }).map((_, i) => (
                <div className="UpcomingReleaseFeed-skeleton-card" key={i} />
            ))}
        </div>
    );
}

function UpcomingReleaseFeed({ games, heading = 'Coming Soon', isLoading = false }) {
    if (isLoading) {
        return (
            <section className="UpcomingReleaseFeed">
                <h2 className="UpcomingReleaseFeed-heading">{heading}</h2>
                <SkeletonRow />
            </section>
        );
    }

    if (!games.length) return null;

    const [featured, ...rest] = games;
    const featuredRemaining = daysUntil(featured.released);

    return (
        <section className="UpcomingReleaseFeed">
            <h2 className="UpcomingReleaseFeed-heading">{heading}</h2>

            <div className="UpcomingReleaseFeed-featured">
                {featured.background_image && (
                    <img
                        className="UpcomingReleaseFeed-featured-thumb"
                        src={featured.background_image}
                        alt={featured.name}
                    />
                )}
                <div className="UpcomingReleaseFeed-featured-overlay">
                    {featuredRemaining !== null && (
                        <span className="UpcomingReleaseFeed-badge UpcomingReleaseFeed-badge--large">
                            {featuredRemaining === 0 ? 'TODAY' : `${featuredRemaining} days until release`}
                        </span>
                    )}
                    <p className="UpcomingReleaseFeed-featured-title">{featured.name}</p>
                    <div className="UpcomingReleaseFeed-featured-meta">
                        <span>{formatDate(featured.released)}</span>
                        {platformNames(featured) && <span>{platformNames(featured)}</span>}
                    </div>
                </div>
            </div>

            <div className="UpcomingReleaseFeed-row">
                {rest.map((game, index) => {
                    const remaining = daysUntil(game.released);

                    return (
                        <div
                            className="UpcomingReleaseFeed-card"
                            key={game.id}
                            style={{ animationDelay: `${index * 0.07}s` }}
                        >
                            <div className="UpcomingReleaseFeed-thumb-wrap">
                                {game.background_image && (
                                    <img
                                        className="UpcomingReleaseFeed-thumb"
                                        src={game.background_image}
                                        alt={game.name}
                                    />
                                )}

                                {remaining !== null && (
                                    <span className="UpcomingReleaseFeed-badge">
                                        {remaining === 0 ? 'TODAY' : `${remaining} days until release`}
                                    </span>
                                )}

                                <div className="UpcomingReleaseFeed-thumb-overlay" />
                            </div>

                            <span className="UpcomingReleaseFeed-date">
                                {formatDate(game.released)}
                            </span>
                            <p className="UpcomingReleaseFeed-title">{game.name}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default UpcomingReleaseFeed;
