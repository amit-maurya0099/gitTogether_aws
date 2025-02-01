import React from 'react'
import {Routes,Route} from "react-router-dom"
import Body from './components/Body';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Body/>}>
      </Route>
     </Routes>
     
     </>
  )
}

export default App;
