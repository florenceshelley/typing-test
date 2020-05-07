import React, {useContext, useEffect, useState} from 'react';

import {Context} from '../store';

const TypingTest = () => {
    const [{words, hasError}, dispatch] = useContext(Context);
    const [curWord] = useState(0);

    /** Fetch function, placed into an actions directory
     *
     */
    useEffect(() => {
            fetch("https://random-word-api.herokuapp.com/word?number=100&swear=1")
                .then(d => d.json())
                .then(d => dispatch({type: 'GET_WORDS', payload: d}))
                .catch(e => dispatch({type: 'SET_ERROR', payload: e}));
        },
        [dispatch]
    );

    return (
        <div className="TypingTest">
            { hasError
                ? <div className="TypingTest__error">There seems to be an error loading words!</div>
                : <>
                   <div className="TypingTest__word">{words[curWord]}</div>
                   <input
                        placeholder="Enter text here">
                </>
            }
        </div>
    );
};

export default TypingTest;