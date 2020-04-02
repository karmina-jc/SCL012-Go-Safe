import React from 'react';
import logoPequeño from '../pictures/logoPequeño.svg';
import misRutas from '../pictures/misRutas.svg';
import newRoute from '../pictures/newRoute.svg';
import baraMenu from '../pictures/barraMenu.svg';
import './homeRoutes.css'


function HomeRoutes(props) {
  return (
  <div className="homeRoutes"> 
    <img  className="littleBrand"  src={logoPequeño} alt="logoPequeño"></img>
    
  <div className="routes">
    <img src={misRutas} alt="misRutas"></img>
    <img src={newRoute} alt="nuevaRuta"></img>
  </div>
    <img src={baraMenu} alt="homeRoutes"></img>
  </div>
  )
}

export default HomeRoutes;