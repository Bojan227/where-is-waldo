import React, { useId } from 'react';

import waldo from '../images/waldo-f.jpg';
import odlaw from '../images/odlaw.jpeg';
import wizard from '../images/wizard.jpg';
import wenda from '../images/wenda.jpg';

export default function Characters({ currentChar = [], char, chooseOption }) {
  const [charIcons, setCharIcons] = React.useState(char);

  const filterIcons = charIcons.map(icon => {
    if (icon === 'waldo') {
      return { name: icon, src: waldo };
    }
    if (icon === 'odlaw') {
      return { name: icon, src: odlaw };
    }
    if (icon === 'wizard') {
      return { name: icon, src: wizard };
    }
    return { name: icon, src: wenda };
  });

  const allIcons = filterIcons.map((icon, i) => (
    <div
      style={{
        opacity: currentChar.some(character => character === icon.name)
          ? '0.2'
          : '1',
      }}
      onClick={e => chooseOption(e, icon.name)}
      key={useId()}
    >
      <img
        style={{ width: '45px', height: '45px' }}
        src={icon.src}
        alt={icon.name}
      />
      <h4>{icon.name}</h4>
    </div>
  ));

  return <div>{allIcons}</div>;
}
