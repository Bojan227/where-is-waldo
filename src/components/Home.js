import React from 'react';
import { Link } from 'react-router-dom';
import LevelsContainer from './LevelsContainer';
import waldo from '../images/waldo-title.jpeg';

export default function Home({ getLevel, getTimes }) {
  return (
    <>
      <header className="main-header">
        <img src={waldo} alt="character icon" />
        <div className="title">
          <h1 style={{ color: '#06B6D4' }}>Where&apos;</h1>
          <h1 style={{ color: '#BE123C' }}>Waldo?</h1>
        </div>
      </header>
      <LevelsContainer getLevel={getLevel} />
      <footer>
        <h1>Are you a Waldo expert?</h1>
        <Link to="/leaderboard">
          <button type="button" onClick={getTimes}>
            View Leaderboard
          </button>
        </Link>
      </footer>
    </>
  );
}
