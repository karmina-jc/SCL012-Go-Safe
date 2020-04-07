import React from 'react';

import { withRouter } from "react-router-dom";
import logoApp from  './pictures/logoApp.png';
//import Button from '../components/button';
import './home.css'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


const Home = () => {
  return (
  
  <div className="homeContent">
    <img src={logoApp} alt="logo" className="logo"></img>
    <div className="homeTittle">

    <Breadcrumb>
    <BreadcrumbItem><a  href="/signin">INICIAR SESION</a></BreadcrumbItem>
    <BreadcrumbItem><a href="/signup">REGISTRATE</a></BreadcrumbItem>
    </Breadcrumb>

    </div>
  </div>  
  );
};

export default withRouter(Home);