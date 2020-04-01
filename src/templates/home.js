import React from 'react';
import logoApp from  '../pictures/logoApp.png';
//import Button from '../components/button';
import './home.css'


const Home = () => {
  return (
  <div className="homeContent">
    <img src={logoApp} alt="logo" className="logo"></img>
    <div className="homeTittle">
    <p> INICIAR SESION </p>
    <p> REGISTRATE </p>
    </div>
  </div>
    
  );
};

export default Home;