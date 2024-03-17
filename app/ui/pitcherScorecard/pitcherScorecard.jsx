// PitcherScorecard.js
import styles from './pitcherScoreCards.module.css';

const PitcherScorecard = () => {
    return (
        <div className={styles.scorecard}>
            <div className={styles.header}>
                <img src="https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/425794/headshot/67/current" alt="Pitcher Image" className={styles.image} />
                <h1>Pitcher Name</h1>
                <p>Team: Team Name</p>
            </div>
            <div className={styles.statistics}>
                <h2>Statistics</h2>
                <ul>
                    <li>ERA: 3.50</li>
                    <li>K/9: 10.2</li>
                    <li>WHIP: 1.20</li>
                    {/* Add more statistics as needed */}
                </ul>
            </div>
            <div className={styles.performance}>
                <h2>Performance</h2>
                <p>Wins: 10</p>
                <p>Losses: 3</p>
                <p>Saves: 5</p>
                {/* Add more performance metrics as needed */}
            </div>
        </div>
    );
};

export default PitcherScorecard;
