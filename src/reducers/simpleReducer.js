export default (state ={results: [], selected: {}}, action) => {
    switch (action.type) {
        case 'SEARCH_ACTION_FULLFIELD':
            return {
                results: action.payload.results
            };
        case 'LOAD_MORE_ACTION_FULLFIELD':
            const newMoviesList = action.payload.results;
            const { results } = state;
            return {
                ...state,
                results: [...results, ...newMoviesList]
            };
        case 'SELECT_MOVIE_ACTION':
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state;
    }
}