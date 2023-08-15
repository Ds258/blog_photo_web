import AboutUs from './components/AboutUs/AboutUs';
import Discovery from './components/Discovery/Discovery';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import WN from './components/WN/WN';

function App() {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <WN/>
      <Discovery/>
      <AboutUs/>
      <Footer/>
    </div>
  );
}

export default App;
