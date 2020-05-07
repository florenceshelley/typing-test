import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Context} from '../store';

import Stats from "./Stats";

const TypingTest = () => {
    const [{words, hasError}, dispatch] = useContext(Context);
    const [curWord, setCurWord] = useState(0);

    const [seconds, setSeconds] = useState(20);
    const [score, setScore] = useState(0);

    const [input, setInput] = useState('');
    // Timer only decreases while timer is active, when first keypress is done
    const [active, setActive] = useState(false);
    // Disabled status for text box when timer runs out
    const [disabled, setDisabled] = useState(true);

    /**
     * Function invoked to grab the placeholder text for the text box.
     */
    const getPlaceholder = useCallback(() => {
            return (seconds === 20 && active === false)
                ? "Start test here"
                : active
                    ? "Keep going!"
                    : "Test over!"
        }, [seconds, active]
    );

    /**
     * Event handler function invoked when input is changed within the input field.
     * When enter or space is pressed, it compares the word with the input.
     */
    const handleKeyDown = useCallback(event => {
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (input) {
                const word = words[curWord];
                if (input === word) {
                    setScore(score + 1);
                }
                setInput('');
                setCurWord(curWord !== words.length - 1 ? curWord + 1 : 0);
            }
        }}, [words, curWord, input, score]
    );

    /**
     * Event handler function invoked when input is changed within the input field.
     * Sets the input to state, as well as starting the countdown timer after first input of page load.
     * All input is set to lower case to adapt to mobile screens.
     */
    const handleInput = useCallback(event => {
        if(active === false && seconds !== 0) {
            setActive(true);
        }
        setInput(event.target.value.toLowerCase());
    }, [active, seconds]);

    /**
     * Fetch function, can be placed into an actions directory
     */
    useEffect(() => {
        fetch("https://random-word-api.herokuapp.com/word?number=100&swear=1")
            .then(d => d.json())
            .then(d => dispatch({type: 'GET_WORDS', payload: d}))
            .catch(e => dispatch({type: 'SET_ERROR', payload: e}));
        setDisabled(false);
        }, [dispatch]
    );

    /**
     * Handles the countdown timer once the timer is active after first input.
     * Once the timer reaches zero, the countdown will stop and the text box will be disabled.
     */
    useEffect(() => {
        let interval = null;
        if (active) {
            if (seconds > 0) {
                interval = setInterval(() => setSeconds(seconds - 1), 1000);
            } else {
                clearInterval(interval);
                setActive(false);
                setDisabled(true);
            }
        }
        return () => clearInterval(interval);
    }, [active, seconds, setDisabled]);

    // contains a conditional to display error, if anything goes wrong with fetching.
    return (
        <div className="TypingTest">
            { hasError
                ? <div className="TypingTest__error">There was an error loading the app.</div>
                : <>
                    <Stats seconds={seconds} score={score} />
                    <div className="TypingTest__word">
                        {words[curWord]}
                    </div>
                    <input
                        id="testInput"
                        value={input}
                        placeholder={getPlaceholder()}
                        disabled={disabled || !words}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        autoFocus />
                </>
            }
        </div>
    );
};

export default TypingTest;