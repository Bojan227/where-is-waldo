import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import prettyMilliseconds from 'pretty-ms';

export default function ScoreCard({ time, level, resetTime }) {
  const [responseMessage, setResponseMessage] = React.useState(undefined);
  const [errorMsg, setErrorMsg] = React.useState(undefined);

  return (
    <div className="end-game-screen">
      <Formik
        initialValues={{
          name: '',
          time,
          level: parseInt(level, 10) + 1,
        }}
        onSubmit={async values => {
          if (!values.name) {
            setErrorMsg('Please enter your name!');
            return;
          }

          const response = await fetch('/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, date: new Date().getTime() }),
          });

          const json = await response.json();

          if (response.ok) {
            setErrorMsg(undefined);
            setResponseMessage(json.msg);
          }
        }}
      >
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label
            htmlFor="name"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Enter Your Name
          </label>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Field
              id="name"
              style={{
                padding: '10px 25px',
                borderRadius: '15px',
                border: '0',
              }}
              name="name"
              placeholder="Jane"
            />
            {errorMsg && (
              <h3 style={{ color: '#DC2626', fontWeight: '900' }}>
                {errorMsg}
              </h3>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '15px',
            }}
          >
            <button className="save-btn" type="submit">
              Save Score
            </button>
            <Link to="/">
              <button
                type="button"
                onClick={resetTime}
                className="return-btn-end"
              >
                Return Home
              </button>
            </Link>
          </div>
        </Form>
      </Formik>
      <div>
        <h1>Your time is: {prettyMilliseconds(time, { verbose: true })}</h1>
      </div>

      {responseMessage && (
        <h1 style={{ color: '#34D399' }}>{responseMessage}</h1>
      )}
    </div>
  );
}
