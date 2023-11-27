import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
 import ReactDom from 'react-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer'
import Logout from './components/Logout';
import EditNote from './components/EditNote';
import Error from './components/Error';
const App = () =>{

  return (<>
     
     <Navbar/>
    <Routes>
    <Route exact path="/" element={  <Home />}/>
    <Route  path="/about" element={  <About />}/>
    <Route  path="/contact" element={  <Contact />}/>
    <Route  path="/signin" element={  <Login />}/>
    <Route  path="/signup" element={  <Signup />}/>
    <Route  path="/logout" element={  <Logout/>}/>

    <Route  path="/editnote/:id" element={  <EditNote/>}/>
    <Route path="*" element = {<Error />} />
    {/* <Route  path="/editnote/:id" element={  <EditNote/>}/>
    */}

    
     
    
    
  </Routes>
  <Footer />




  </>

  )}

export default App;
