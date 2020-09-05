import React, { useState, useEffect, useCallback } from "react";
import { episodesAction } from "../actions/movieActions";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Episodes = ({ tv_id, season }) => {
  const [episodes, setEpisodes] = useState([]);

  const episodesInfo = useCallback(async () => {
    let episodes;

    episodes = await episodesAction(tv_id, season);
    console.log("component episodes: ", episodes.episodes);

    setEpisodes(episodes.episodes);
  }, [tv_id, season]);

  useEffect(() => {
    episodesInfo();
  }, [episodesInfo]);

  return (
    <div>
      <h3>Episodes</h3>
      {episodes && episodes.length > 1 && (
        <Collapse
          accordion
          defaultActiveKey={[episodes[0].id]}
          destroyInactivePanel={true}
        >
          {episodes.map((episode, i) => (
            <Panel
              header={`${episode.episode_number}) ${episode.name}`}
              key={i}
            >
              <p>{episode.overview}</p>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default Episodes;
