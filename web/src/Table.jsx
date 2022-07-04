import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { MdFilterList } from 'react-icons/md';
import { TbSortDescending } from 'react-icons/tb';
import Repo from './Repo';
import './styles/Table.css';

const Table = () => {
  const { repoDatas } = useContext(AppContext);

  const [filterLang, setFilterLang] = useState('');

  const [onFilter, setOnFilter] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const filterHandler = (lang) => {
    const find = repoDatas.filter((data) =>
      data.language.toUpperCase().includes(lang.toUpperCase())
    );
    setFilteredList(find);
  };

  return (
    <>
      <h1>Repo Table</h1>
      <div className="sorting">
        <input
          type="text"
          value={filterLang}
          onChange={(e) => {
            filterHandler(e.target.value);
            setOnFilter(true);
            setFilterLang(e.target.value);
          }}
        />
        {onFilter ? (
          <button
            className="sort-btn"
            onClick={() => {
              setFilterLang('');
              setOnFilter(false);
            }}
          >
            <MdFilterList />
          </button>
        ) : (
          <button
            className="sort-btn"
            onClick={() => filterHandler(filterLang)}
          >
            <TbSortDescending />
          </button>
        )}
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
          {(filterLang.length > 0 && onFilter ? filteredList : repoDatas)
            .sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .map((data) => (
              <Repo
                data={data}
                key={data.id}
                setFilterLang={setFilterLang}
                filterHandler={filterHandler}
                setOnFilter={setOnFilter}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
