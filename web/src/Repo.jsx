import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Repo.css';

const Repo = ({ data, setFilterLang, filterHandler, setOnFilter }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/info/${data.id}`);
  };

  return (
    <tr className="repo-details">
      <td onClick={() => clickHandler()}>{data.name}</td>
      <td onClick={() => clickHandler()}>{data.description}</td>
      <td>
        {data.language && (
          <button
            className="language-btn"
            onClick={() => {
              setFilterLang(data.language);
              filterHandler(data.language);
              setOnFilter(true);
            }}
          >
            {data.language}
          </button>
        )}
      </td>
      <td>{data.forks}</td>
    </tr>
  );
};

export default Repo;
