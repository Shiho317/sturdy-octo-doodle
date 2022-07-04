import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from './App';

const RepoInfo = () => {
  const params = useParams();
  const { repoDatas } = useContext(AppContext);

  const [clickedRepo, setClickedRepo] = useState([]);
  const [events, setEvents] = useState();

  useEffect(() => {
    const repo = repoDatas.filter((data) => data.id === Number(params.id));
    if (repo.length > 0) {
      axios
        .get(repo[0].owner.received_events_url)
        .then((res) => {
          setEvents(res.data[0]);
          setClickedRepo(repo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id, repoDatas]);
  return (
    <>
      {clickedRepo.length > 0 && events && (
        <div>
          <h1>{clickedRepo[0].name}</h1>
          <div>
            <h2>Latest Commit</h2>
            <h3>commit date: {events.created_at.split('T')[0]}</h3>
            <h3>author: {events.payload.commits[0].author.name}</h3>
            <h3>message: "{events.payload.commits[0].message}"</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoInfo;
