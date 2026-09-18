import React from 'react';
import './UpcomingReleaseFeed.css';

function formatDate(dateStr) {
    if (!dateStr) return 'TBA';
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
}

// how many whole days from today until this game releases -- used
// for the little countdown badge on each card
function daysUntil(dateStr) {
    if (!dateStr) return null;

    const releaseDate = new Date(dateStr);
    const today = new Date();

    // zero out the time portion on both so we're comparing whole
    // calendar days, not exact hours/minutes (otherwise "tomorrow at
    // 1am" could round down to "0 days" depending on what time it is
    // right now)
    releaseDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.round((releaseDate - today) / msPerDay);

    return diff >= 0 ? diff : null;
}

function UpcomingReleaseFeed({ games, heading = 'Coming Soon' }) {
    if (!games.length) return null;

    return (
        <section className="UpcomingReleaseFeed">
            <h2 className="UpcomingReleaseFeed-heading">{heading}</h2>
            <div className="UpcomingReleaseFeed-row">
                {games.map((game) => {
                    const remaining = daysUntil(game.released);

                    return (
                        <div className="UpcomingReleaseFeed-card" key={game.id}>
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
                                        {remaining === 0 ? 'TODAY' : `${remaining}d`}
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
