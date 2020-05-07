const Reducer = (state, {type, payload}) => {
    switch (type) {
        case 'GET_WORDS':
            return {...state, words: payload};
        case 'SET_ERROR':
            return {...state, hasError: payload};
        default:
            return state;
    }
};

export default Reducer;