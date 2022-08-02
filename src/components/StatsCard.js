import React from 'react';
import prettyMilliseconds from 'pretty-ms';
import { format } from 'date-fns';

export default function StatsCard({ id, level, name, date, time }) {
  return (
    <div
      className="player--card"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <h3>{id + 1}.</h3>
      <h4>{level}</h4>
      <h2>{name}</h2>
      <h2>{format(date, 'do-MMMM-yyyy ')}</h2>
      <h2>{prettyMilliseconds(time, { verbose: true })}</h2>
    </div>
  );
}
