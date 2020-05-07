import React from 'react';

const Stats = ({seconds, score}) => (
    <>
        <div className="Stats__timer">Seconds remaining: {seconds}</div>
        <div className="Stats__score">Score: {score}</div>
    </>
);

export default Stats;