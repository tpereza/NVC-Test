import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serieDetail } from "../actions/movieActions";
import { NavLink } from "react-router-dom";

import Episodes from "../components/Episodes";

const DetailPage = () => {
  const [selected, setSelected] = useState({});
  const [detail, setDetail] = useState({});
  const [season, setSeason] = useState({});
  const dispatch = useDispatch();
  const info = useSelector((state) => state);

  const detailSerie = useCallback(
    async (id) => {
      let detail;

      if (selected.name) {
        detail = await serieDetail(id);
        setSeason(detail.seasons[0]);
      } else {
        detail = null;
      }

      setDetail(detail);
    },
    [selected.name]
  );

  useEffect(() => {
    setSelected(() => {
      return info.simpleReducer.selected;
    });
    detailSerie(selected.id);
  }, [dispatch, info, detailSerie, selected.id]);
  return (
    // <div>
    //   <header>
    //     <h1>DetailPage</h1>
    //   </header>
    //   <main id='header' className='popup'>
    //       <button><NavLink to='/'>Back</NavLink></button>
    //     <h1>TEST</h1>
    // </main>
    //   <pre>
    //     {
    //       JSON.stringify(selected)
    //     }
    //   </pre>
    // </div>
    <section className="popup">
      <div className="content">
        <button className="close">
          <NavLink to="/">Back</NavLink>
        </button>
        <h2>
          {selected.name || selected.title}
          <span> ({selected.popularity})</span>
        </h2>
        <div className="plot">
          <img
            src={
              selected.poster_path
                ? `https://image.tmdb.org/t/p/w500/${selected.poster_path}`
                : "https://via.placeholder.com/500x750.jpg/09f/fff"
            }
          />
          {detail && detail.seasons && <h3>SEASONS</h3>}
          <div className="rating">
            {detail && detail.seasons ? (
              detail.seasons.map((season, i) => (
                <button
                  key={i}
                  className="season"
                  onClick={() => setSeason(detail.seasons[i])}
                >
                  {season.season_number}
                </button>
              ))
            ) : (
              <p className="rating"> Rating: {selected.popularity} </p>
            )}
          </div>
          <p>{season.name}</p>
          {detail && detail.seasons && (
            <div className="episodes">
              <Episodes tv_id={selected.id} season={season.season_number} />
            </div>
          )}
          <p>{selected.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
