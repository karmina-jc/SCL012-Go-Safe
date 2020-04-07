import React from 'react';
import routeIcon from '../templates/pictures/routeIcon.svg';
import profile from '../templates/pictures/profile.svg';
import myrouteIcon from '../templates/pictures/myrouteIcon.svg';
import shareRoute from '../templates/pictures/shareRoute.svg';
import './grayBar.css'

function GrayBar () {
  return (
    <div className="grayPlace">  
        <button className="btn"><img  src={profile} alt="Icono de Perfil"></img></button>
        <button className="btn"><img  src={routeIcon} alt="Icono de ruta"></img></button>
        <button className="btn"><img  src={myrouteIcon} alt="Icono de mis rutas"></img></button>
        <button className="btn"><img  src={shareRoute} alt="Icono de compartir"></img></button>
    </div>    
  );
};

export default GrayBar;