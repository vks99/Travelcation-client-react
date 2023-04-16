import React from 'react';
import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Navigation from './pages/Navigation';
import BlogForm from './pages/BlogForm';
import Blogs from './pages/Blogs';
import Contactus from './pages/Contactus';
import Destination from './pages/Destination';
import History from './pages/History';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Payment from './pages/Payment';
import Signup from './components/auth/Signup';
import Footer from './components/footer';
import Header from './components/header';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { AuthContextProvider } from './context/AuthContext';

function App() {
  return(
    <div className='main-heading'>
    <AuthContextProvider>
        <Navigation />
    
     <div className='main-content'>
        <Routes>
            <Route path='/Signup' element={<Signup />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/' element={<Home />}/>
            <Route element={<ProtectedRoute />}>
                <Route path='/Destination' element={<Destination />}/>
                <Route path='/Blogs' element={<Blogs />}/>
                <Route path='/BlogForm' element={<BlogForm />}/>
                <Route path='/History' element={<History />}/>
                <Route path='/Payment' element={<Payment />}/>
            </Route>
            <Route path='/Contactus' element={<Contactus />}/>
        </Routes>
    
        </div>
        <div className='footer'>
        <Footer />
        </div>
        </AuthContextProvider>    
    </div>
        
);
}

export default App;
