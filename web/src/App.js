import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './Table';

export const AppContext = createContext(null);

const App = () => {
  const [repoDatas, setRepoDatas] = useState([]);

  const getDatas = async () => {
    await axios
      .get('http://localhost:4000/repos/api')
      .then((res) => {
        setRepoDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <AppContext.Provider value={{ repoDatas }}>
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
