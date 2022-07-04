import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from './App';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BiArrowBack } from 'react-icons/bi';

const RepoInfo = () => {
  const params = useParams();
  const { repoDatas } = useContext(AppContext);

  const [clickedRepo, setClickedRepo] = useState([]);
  const [events, setEvents] = useState();
  const [readMe, setReadMe] = useState();

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
      axios
        .get(
          `https://raw.githubusercontent.com/${repo[0].full_name}/master/README.md`
        )
        .then((res) => {
          setReadMe(res.data);
        })
        .catch((err) => {
          console.log('Read Me for this repository is not exist.');
        });
    }
  }, [params.id, repoDatas]);

  return (
    <>
      {clickedRepo.length > 0 && events && (
        <div>
          <h1>{clickedRepo[0].name}</h1>
          <Link to="/">
            <BiArrowBack />
          </Link>
          <div>
            <h2>Latest Commit</h2>
            <h3>commit date: {events.created_at.split('T')[0]}</h3>
            <h3>author: {events.payload.commits[0].author.name}</h3>
            <h3>message: "{events.payload.commits[0].message}"</h3>
          </div>
          {readMe && (
            <div>
              <h2>ReadMe</h2>
              <ReactMarkdown
                children={readMe}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RepoInfo;
