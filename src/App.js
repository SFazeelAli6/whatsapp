// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
// import firebase from "./firebase"
function App() {
const [{ user}, dispatch] = useStateValue();

  return (
    <div className="app">
     {!user ? (
       <Login />
     ) : (
      <div className="app__body">
      <Router>
        <Sidebar/>
        <Routes>
          {/* <Route path='/' element={<Sidebar />} /> */}

          <Route path='/Room/:roomId' element={<Chat />} />
       
          {/* <Route path='/' element={<Sidebar />} /> */}

          <Route path='/' element={<Chat />} />
        </Routes>
      </Router>
    </div>
     )}
     
    </div>
  );
}

export default App;
