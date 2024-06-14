import logo from './logo.svg';
import './App.css';
import React, { Component,useState } from 'react';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App =()=> {
  let pageSize = 12;
  let apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News key='general' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='general' />} />
            <Route exact path="/business" element={<News key='business' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='business' />} />
            <Route exact path="/technology" element={<News key='technology' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='technology' />} />
            <Route exact path="/sport" element={<News key='sport' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='sport' />} />
            <Route exact path="/science" element={<News key='science' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='science' />} />
            <Route exact path="/health" element={<News key='health' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='health' />} />
            <Route exact path="/entertainment" element={<News key='entertainment' setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category='entertainment' />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;