import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameContainer from './GameContainer';
import Home from './Home';
import '../style.css';
import Leaderboard from './Leaderboard';

export default function App() {
  const [gameData, setGameData] = React.useState(undefined);
  const [time, setTime] = React.useState(0);
  const [timesData, setTimesData] = React.useState(undefined);
  const [timerOn, setTimerOn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  function resetTime() {
    setTime(0);
    setTimerOn(false);
    setIsLoading(true);
    setGameData(undefined);
  }

  const getTimes = () => {
    fetch('/times', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        setTimesData(data);
      });
  };

  async function postStartTime() {
    const response = await fetch('/timer', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        time: new Date().getTime(),
      }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json.msg);
    }
  }

  function fetchLevel(id) {
    setIsLoading(true);
    if (isLoading) {
      fetch(`/level/${id}`)
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          setGameData(data);
          setIsLoading(false);
          postStartTime();
          setTimerOn(true);
        });
    }
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home getLevel={fetchLevel} getTimes={getTimes} />}
          />
          {gameData && (
            <Route
              path="/game"
              element={
                <GameContainer
                  resetTime={resetTime}
                  isLoading={isLoading}
                  setTimerOff={setTimerOn}
                  time={time}
                  level={gameData.level}
                  src={gameData.src}
                  char={gameData.char}
                />
              }
            />
          )}
          {timesData && (
            <Route
              path="/leaderboard"
              element={<Leaderboard timesData={timesData} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
