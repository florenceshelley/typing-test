import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Context} from '../store';

import Stats from "./Stats";

const TypingTest = () => {
    const [{words, hasError}, dispatch] = useContext(Context);
    const [curWord] = useState(0);

    const [seconds] = useState(20);
    const [score] = useState(0);

    // Disabled status for text box when timer runs out
    const [disabled, setDisabled] = useState(true);

    /**
     *  Function invoked to grab the placeholder text for the text box.
     */
    const getPlaceholder = useCallback(() => {
            return (seconds === 20 && disabled === false)
                ? "Start test here"
                : !disabled
                    ? "Keep going!"
                    : "Test over!"
        },
        [seconds, disabled]
    );

    /**
     * Fetch function, can be placed into an actions directory
     */
    useEffect(() => {
            fetch("https://random-word-api.herokuapp.com/word?number=100&swear=1")
                .then(d => d.json())
                .then(d => dispatch({type: 'GET_WORDS', payload: d}))
                .catch(e => dispatch({type: 'SET_ERROR', payload: e}));
            setDisabled(false);
        },
        [dispatch]
    );

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
                        placeholder={getPlaceholder()}
                        disabled={disabled || !words} />
                </>
            }
        </div>
    );
};

export default TypingTest;