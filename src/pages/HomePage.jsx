import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction, loadMoreAction } from '../actions/movieActions';

import Search from "../components/Search";
import ResultsGrid from '../components/ResultsGrid';

const App = () => {
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {},
        page: 1,
    });
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
    const info = useSelector((state) => state);

    useEffect(() => {
        setState(prevState => {
            return {...prevState, results: info.simpleReducer.results}
        })
        document.addEventListener('scroll', handleScroll);
        if(!isFetching) return;
        fetchMoreMovies();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch, isFetching, info]);

    const handleInput = (e) => {
        let s = e.target.value;

        setState(prevState =>{
            return {...prevState, s: s}
        })
    }

    const fetchMoreMovies = () => {
        console.log('pagina: ',state.page)
        dispatch(loadMoreAction(state.s, state.page + 1));
        setState(prevState => {
            return {...prevState, page: state.page + 1}
        });
        setIsFetching(false);
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    const search = (e) => {
        if(e.key === "Enter"){
            dispatch(searchAction(state.s, 1));
            setState(prevState => {
                return {...prevState, page: 1}
            });
        }
    }

    return(
        <div>
          <header>
            <h1>Movies Database</h1>
          </header>
          <main id='header'>
              <Search handleInput={handleInput} search={search}/>
              <ResultsGrid results={ state.results }/>
              { isFetching && (
                  <p>Cargando...</p>
              )}
          </main>
          {/* <pre>
            {
              JSON.stringify(state.results)
            }
          </pre> */}
        </div>
      );

}

export default App