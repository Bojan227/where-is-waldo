import React from 'react';
import { Link } from 'react-router-dom';
import Characters from './Characters';
import './styles/levels.css';

export default function Level({ url, num, allIcons, getLevel }) {
  return (
    <Link to="/game">
      <div className="card" onClick={getLevel}>
        <img src={url} width="450px" height="250px" alt="level-img" />
        <div className="icons-section">
          <h3>Level {num}</h3>
          <div className="card-char">
            <Characters char={allIcons} />
          </div>
        </div>
      </div>
    </Link>
  );
}
