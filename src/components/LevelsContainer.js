import React from 'react';
import Level from './Level';
import './styles/levels.css';

import lvl1 from '../images/lvl-1.jpg';
import lvl2 from '../images/lvl-2.jpeg';
import lvl3 from '../images/lvl-3.jpeg';
import lvl4 from '../images/lvl-4.jpg';
import lvl5 from '../images/lvl-5.jpg';
import lvl6 from '../images/lvl-6.jpg';

export default function LevelsContainer({ getLevel }) {
  const [levels, setLevels] = React.useState([
    {
      url: lvl1,
      num: 1,
      char: ['waldo', 'odlaw', 'wizard'],
      id: 0,
    },
    {
      url: lvl2,
      num: 2,
      char: ['waldo'],
      id: 1,
    },
    {
      url: lvl3,
      num: 3,
      char: ['waldo', 'odlaw', 'wizard', 'wenda'],
      id: 2,
    },
    {
      url: lvl4,
      num: 4,
      char: ['waldo', 'odlaw'],
      id: 3,
    },
    {
      url: lvl5,
      num: 5,
      char: ['waldo', 'odlaw', 'wizard', 'wenda'],
      id: 4,
    },
    {
      url: lvl6,
      num: 6,
      char: ['waldo'],
      id: 5,
    },
  ]);

  const allLevels = levels.map(level => (
    <Level
      key={level.id}
      url={level.url}
      num={level.num}
      allIcons={level.char}
      getLevel={() => getLevel(level.id)}
    />
  ));

  return <div className="levels-container">{allLevels}</div>;
}
