import Homepage from './pages/Homepage/homepage';
import Login from './pages/Login/Login';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Sign_up/Sign_up';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signin" render={() => (user ? <Homepage /> : <Login />)} />
        <Route path="/signup" render={() => (user ? <Homepage /> : <Signup />)} />
      </Routes>
    </Router>    
  );
}

export default App;
