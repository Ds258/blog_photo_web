import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Sign_up/Sign_up';
import { Context } from './context/Context';
import Settings from './pages/Settings/Settings';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route key="home" path="/" element={<Homepage />} />
        <Route path="/signin" element={user ? <Homepage /> : <Login />} />
        <Route path="/signup" element={user ? <Homepage /> : <Signup />} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </Router>    
  );
}

export default App;
