import React from 'react';
import { Link } from 'react-router-dom';
import ScoreCard from './ScoreCard';
import Characters from './Characters';
import './styles/gameContainer.css';

export default function GameContainer({
  src,
  char,
  isLoading,
  level,
  time,
  setTimerOff,
  resetTime,
}) {
  const [gameState, setGameState] = React.useState(undefined);
  const [currentChar, setCurrentChar] = React.useState([]);
  const [charLength, setCharLength] = React.useState(char.length);
  const [gameOver, setGameOver] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [endTime, setEndTime] = React.useState(undefined);

  function getEndTime() {
    fetch('/timer', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        time: new Date().getTime(),
      }),
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        setEndTime(data.time);
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    if (charLength === 0) {
      setGameOver(true);
      setTimerOff(false);
      getEndTime();
    }
  }, [charLength]);

  function findClickPosition(e) {
    const mouseX = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const mouseY = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    setGameState({ x: mouseX, y: mouseY, lvl: level });

    if (e.target.nextSibling.classList.contains('invisible')) {
      e.target.nextSibling.style.position = 'absolute';
      e.target.nextSibling.classList.remove('invisible');

      //  prevent menu to show out of the edges of the image
      if (mouseX > 75) {
        const calc = mouseX - 74;
        e.target.nextSibling.style.left = `${mouseX - calc}%`;
      } else {
        e.target.nextSibling.style.left = `${mouseX}%`;
      }

      if (mouseY > 90) {
        const calc = mouseY - 87;
        e.target.nextSibling.style.top = `${mouseY - calc}%`;
      } else if (mouseY > 80) {
        const calc = mouseY - 80;
        e.target.nextSibling.style.top = `${mouseY - calc}%`;
      } else {
        e.target.nextSibling.style.top = `${mouseY}%`;
      }
    } else {
      e.target.nextSibling.classList.add('invisible');
      e.target.nextSibling.style.position = 'absolute';
      e.target.nextSibling.classList.remove('invisible');
      if (mouseX > 75) {
        const calc = mouseX - 74;
        e.target.nextSibling.style.left = `${mouseX - calc}%`;
      } else {
        e.target.nextSibling.style.left = `${mouseX}%`;
      }

      if (mouseY >= 90) {
        const calc = mouseY - 87;
        e.target.nextSibling.style.top = `${mouseY - calc}%`;
      } else if (mouseY >= 80) {
        const calc = mouseY - 80;
        e.target.nextSibling.style.top = `${mouseY - calc}%`;
      } else {
        e.target.nextSibling.style.top = `${mouseY}%`;
      }
    }
  }

  const checkCoordinates = async name => {
    const response = await fetch('/coord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...gameState, ch: name }),
    });

    const json = await response.json();

    if (response.ok) {
      if (currentChar.some(el => el === json.char)) {
        setErrorMsg('You already clicked there!');
      } else {
        setCurrentChar([...currentChar, json.char]);
        setCharLength(charLength - 1);
        setErrorMsg('');
      }
    } else {
      setErrorMsg(json.msg);
    }
  };

  function chooseOption(e, name) {
    checkCoordinates(name);

    if (e.target.localName === 'img') {
      e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
        'invisible'
      );
    } else {
      e.target.parentElement.parentElement.parentElement.classList.add(
        'invisible'
      );
    }
  }

  return (
    <>
      <header className="game-nav">
        {!isLoading && (
          <div>
            <Characters currentChar={currentChar} char={char} />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ gap: '0' }}>
            <h3>{`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:</h3>
            <h3>{`0${Math.floor((time / 1000) % 60)}`.slice(-2)}:</h3>
            <h3>{`0${(time / 10) % 100}`.slice(-2)}</h3>
          </div>
          {errorMsg && (
            <h3
              style={{
                color: 'red',
              }}
            >
              {errorMsg}
            </h3>
          )}
        </div>
        <Link to="/">
          <button onClick={resetTime} type="button" className="return-btn">
            Return Home
          </button>
        </Link>
      </header>

      <div className="container">
        <div>
          <img onClick={e => findClickPosition(e)} src={src} alt="Loading" />
          <div className="new-el invisible">
            <div className="options">
              {!isLoading && (
                <Characters chooseOption={chooseOption} char={char} />
              )}
            </div>
          </div>
        </div>
      </div>

      {endTime && (
        <ScoreCard resetTime={resetTime} time={endTime} level={level} />
      )}
    </>
  );
}
