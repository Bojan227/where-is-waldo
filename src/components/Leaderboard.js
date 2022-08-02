import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import StatsCard from './StatsCard';

import './styles/leaderboard.css';

function Leaderboard({ timesData }) {
  const [numOfLevel, setNumOfLevel] = React.useState(undefined);

  function filterByLevel(e) {
    if (!e.target.id) {
      return;
    }

    setNumOfLevel(e.target.id);
  }

  const topTenPlayers = timesData
    .sort((a, b) => a.time - b.time)
    .map((data, i) => (
      <StatsCard
        key={uuid()}
        id={i}
        level={data.level}
        name={data.name}
        date={data.date}
        time={data.time}
      />
    ));

  const selectedLevelStats = timesData
    .sort((a, b) => a.time - b.time)
    .filter(data => {
      if (data.level === parseInt(numOfLevel)) {
        return data;
      }
      if (numOfLevel === '0') {
        return data;
      }
    })
    .map((data, i) => (
      <StatsCard
        key={uuid()}
        id={i}
        level={data.level}
        name={data.name}
        date={data.date}
        time={data.time}
      />
    ));

  return (
    <div className="leaderboard-container">
      <header className="ldr-nav">
        <h1>Players Ranking</h1>
        <Link to="/">
          <button type="button" className="return-btn">
            Return Home
          </button>
        </Link>
      </header>
      <header className="filterBy" onClick={e => filterByLevel(e)}>
        <h3>Filter by Level:</h3>
        <button type="button" id="0">
          Show all
        </button>
        <button type="button" id="1">
          Level 1
        </button>
        <button type="button" id="2">
          Level 2
        </button>
        <button type="button" id="3">
          Level 3
        </button>
        <button type="button" id="4">
          Level 4
        </button>
        <button type="button" id="5">
          Level 5
        </button>
        <button type="button" id="6">
          Level 6
        </button>
      </header>

      <div className="stats">
        <h2>Position</h2>
        <h2>Level</h2>
        <h2>Name</h2>
        <h2>Date</h2>
        <h2>Time</h2>
      </div>
      <main>
        {!numOfLevel && topTenPlayers}
        {numOfLevel && selectedLevelStats}
      </main>
    </div>
  );
}

export default Leaderboard;
