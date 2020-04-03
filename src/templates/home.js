import React from 'react';
import { Link, withRouter } from "react-router-dom";
import logoApp from  './pictures/logoApp.png';
//import Button from '../components/button';
import './home.css'


const Home = () => {
  return (
  
  <div className="homeContent">
    <img src={logoApp} alt="logo" className="logo"></img>
    <div className="homeTittle">
    <p> <Link to="/signin">INICIAR SESION</Link></p>
    <p> <Link to="/signup">REGISTRATE</Link></p>
    </div>
  </div>  
  );
};

export default withRouter(Home);