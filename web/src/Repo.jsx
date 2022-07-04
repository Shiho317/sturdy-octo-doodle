import React from 'react';

const Repo = ({ data, setFilterLang, filterHandler, setOnFilter }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>
        {data.language && (
          <button
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
