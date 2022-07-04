import React from 'react';

const Repo = ({ data }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{data.language}</td>
      <td>{data.forks}</td>
    </tr>
  );
};

export default Repo;
