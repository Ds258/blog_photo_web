import Homepage from './pages/Homepage/Homepage';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Sign_up/Sign_up';
import { Context } from './context/Context';
import Settings from './pages/Settings/Settings';
import Navbar from './components/common/Navbar/Navbar';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import ReadBlog from './pages/ReadBlog/ReadBlog';
import Footer from "./components/common/Footer/Footer";
import EditBlog from "./pages/EditBlog/EditBlog";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route key="home" exact path="/" element={<Homepage />} />
        <Route path="/signin" element={user ? <Homepage /> : <Login />} />
        <Route path="/signup" element={user ? <Homepage /> : <Signup />} />
        <Route path="/settings" element={user ? <Settings /> : <Homepage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post_blog" element={user ? <CreateBlog /> : <Login />} />
        <Route path="/blog/:title" element={<ReadBlog />} />
        <Route path="/edit_blog/:title" element={<EditBlog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
