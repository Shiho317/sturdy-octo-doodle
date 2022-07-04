import React, { useContext } from 'react';
import { AppContext } from './App';
import { MdFilterList } from 'react-icons/md';
import Repo from './Repo';

const Table = () => {
  const { repoDatas } = useContext(AppContext);

  return (
    <>
      <h1>Repo Table</h1>
      <div className="sorting">
        <input type="text" />
        <button>
          <MdFilterList />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>language</th>
            <th>forks</th>
          </tr>
        </thead>
        <tbody>
          {repoDatas.length > 0 &&
            repoDatas.map((data) => <Repo data={data} key={data.id} />)}
        </tbody>
      </table>
    </>
  );
};

export default Table;
