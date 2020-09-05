import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { creditsAction, selectMovie } from '../actions/movieActions';

const Result = ({ result }) => {

    const [actors, setActors] = useState([]);
    const dispatch = useDispatch();

    const actorsInfo = useCallback( async (id) => {
        let actors;

        if(result.name) {
            actors = await creditsAction(id, 'series' );
        }else{
            actors = await creditsAction(id, 'movie' );
        }

        setActors(actors.cast);
    }, [result.name])

    useEffect(() => {
        actorsInfo(result.id);
    },[actorsInfo, result.id]);

    const handleOnClick = () => {
        dispatch(selectMovie(result));
    }

    return (
        <Link to='/detail' className="result" onClick={() => handleOnClick()}>
                <div className="imgbox"> 
                    <img src={result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : 'https://via.placeholder.com/500x750.jpg/09f/fff'} alt={result.name}/>
                </div> 
                <div className="content" onMouseEnter={() => actorsInfo(result.id)}>
                    <h2>{result.name || result.title}</h2>
                    <div className="info">
                        <p>Rating: {result.popularity}</p>
                        {actors && actors.length > 1 && (
                            <ul>
                                {actors.slice(0,3).map((actor) => <li key={actor.id}>{actor.name}</li>)}
                            </ul>
                        )}
                    </div>
                </div>
        </Link>
    )
}

export default Result
