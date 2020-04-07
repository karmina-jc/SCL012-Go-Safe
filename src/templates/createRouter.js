import React from 'react';
import { Link, withRouter } from "react-router-dom";
import logoPequeño from './pictures/logoPequeño.svg';
import misRutas from './pictures/misRutas.svg';
import newRoute from './pictures/newRoute.svg';

import DisplayMap from '../components/DisplayMap';
import './createRouter.css'

function Createroute() {
  return (
  <div className="homeRoutes"> 
        <img  className="littleBrand"  src={logoPequeño} alt="logoPequeño"></img>
        
    <div className="routes"> 
       <DisplayMap />
    </div>

  </div>
  )
}

export default  withRouter(Createroute);