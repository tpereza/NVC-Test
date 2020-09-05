import axios from "axios";

export const searchAction = (query, page) => async (dispatch) => {
  dispatch({ type: "SEARCH_ACTION" });

  try {
    let request = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=b2907782d07859a652052d3bae537475&language=en-US&query=${query}&page=${page}&included_adult=false`
    );

    let data = request.data;

    dispatch({
      type: "SEARCH_ACTION_FULLFIELD",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SEARCH_ACTION_REJECTED",
      payload: error,
    });
  }
};

export const loadMoreAction = (query, page) => async (dispatch) => {
  dispatch({ type: "LOAD_MORE_ACTION" });

  try {
    let request = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=b2907782d07859a652052d3bae537475&language=en-US&query=${query}&page=${page}&included_adult=false`
    );

    let data = request.data;

    dispatch({
      type: "LOAD_MORE_ACTION_FULLFIELD",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOAD_MORE_ACTION_REJECTED",
      payload: error,
    });
  }
};

export const creditsAction = async (id, type) => {
  if (type !== "series") {
    try {
      let request = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b2907782d07859a652052d3bae537475`
      );

      let data = request.data;

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      let request = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=b2907782d07859a652052d3bae537475`
      );

      let data = request.data;

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const selectMovie = (movie) => (dispatch) => {
  dispatch({
    type: "SELECT_MOVIE_ACTION",
    payload: movie,
  });
};

export const serieDetail = async (id) => {
  try {
    let request = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=b2907782d07859a652052d3bae537475&language=en-US`
    );

    let data = request.data;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const episodesAction = async (tv_id, season_number) => {
  try {
    let request = await axios.get(
      `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=b2907782d07859a652052d3bae537475&language=en-US`
    );

    let data = request.data;
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
