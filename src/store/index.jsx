import React, {createContext, useReducer} from "react";
import reducers from '../reducers'

const initState = {
    words: [],
    hasError: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(reducers, initState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initState);

export default Store;