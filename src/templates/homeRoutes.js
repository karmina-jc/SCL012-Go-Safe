import React from 'react';
import logoPequeño from '../templates/pictures/logoPequeño.svg';
import misRutas from '../templates/pictures/misRutas.svg';
import newRoute from '../templates/pictures/newRoute.svg';
import routeIcon from '../templates/pictures/routeIcon.svg';
import profile from '../templates/pictures/profile.svg';
import myrouteIcon from '../templates/pictures/myrouteIcon.svg';
import shareRoute from '../templates/pictures/shareRoute.svg';
import './homeRoutes.css'


function HomeRoutes(props) {
  return (
  <div className="homeRoutes"> 
    <img  className="littleBrand"  src={logoPequeño} alt="logoPequeño"></img>
    
  <div className="routes">
    <img src={misRutas} alt="misRutas"></img>
    <img src={newRoute} alt="nuevaRuta"></img>
  </div>
  <div className="grayPlace">  
          <img  src={profile} alt="Icono de Perfil" ></img>
          <img  src={routeIcon} alt="Icono de ruta" ></img>
          <img  src={myrouteIcon} alt="Icono de mis rutas" ></img>
          <img  src={shareRoute} alt="Icono de compartir" ></img>
        </div>
  </div>
  )
}

export default HomeRoutes;





