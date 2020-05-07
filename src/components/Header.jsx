import React from 'react';

const Header = () => (
    <div className="Header">
        <h1 className="Header__title">Speed Test</h1>
        <ul className="Header__desc">
            <li>Timer begins countdown when you type!</li>
            <li>If your text matches the input word, you get one point!</li>
            <li>What is your high score?</li>
        </ul>
    </div>
);

export default Header;