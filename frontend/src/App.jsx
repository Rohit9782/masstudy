import React from "react";
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard";
import SingleBlog from "./pages/SingleBlog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Live_courses from "./pages/Live_courses";
import Books from "./pages/Books";
import Order from "./pages/Order";
import MyCourses from "./pages/MyCourses";
import AdminRoute from "./pages/AdminRoute";
import TopLoader from "./components/TopLoader";
import CoursePlayer from "./pages/CoursePlayer";


const App = () => {
  
  return (
    <div className="max-w-7xl mx-auto">
      <TopLoader />
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/live-courses" element={<Live_courses />} />
        <Route path="/books" element={<Books />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/courseplayer" element={<CoursePlayer />} />

        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;