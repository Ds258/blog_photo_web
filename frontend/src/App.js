import AboutUs from './components/homepage/AboutUs/AboutUs';
import Discovery from './components/homepage/Discovery/Discovery';
import Footer from './components/common/Footer/Footer';
import Navbar from './components/common/Navbar/Navbar';
import Slider from './components/homepage/Slider/Slider';
import WN from './components/homepage/WN/WN';
import Login from './pages/Login/Login';
import Homepage from './pages/Homepage/homepage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
    </Router>    
  );
}

export default App;
