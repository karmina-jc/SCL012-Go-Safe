import React from 'react';
import logoPequeño from '../pictures/logoPequeño.svg';
import myHome from '../pictures/myHome.svg';
import beachHouse from '../pictures/beachHouse.svg';
import work from '../pictures/work.svg';
import routeIcon from '../pictures/routeIcon.svg';
import motherhIcon from '../pictures/motherhIcon.svg';
import profile from '../pictures/profile.svg';
import myrouteIcon from '../pictures/myrouteIcon.svg';
import shareRoute from '../pictures/shareRoute.svg';
import './myRoutes.css'

//import './homeRoutes.css'

function MyRoutes(props) {
  return (
  
  
  <div className="homeRoutes"> 
    <div className="headRoute">	
        <img   src={logoPequeño} alt="logoPequeño"></img>
  	    <h4 className="route"> Mis Rutas</h4>	
    </div> 
    <div className="typeRoute">      
          <div className="Place1">
      		<img src={myHome} alt="Logo casa"></img>
      		<p>Casa</p>
  		</div>
  		<div className="Place2">
      		<img src={beachHouse} alt="Logo casa Playa"></img>
      		<p>Casa en la Playa</p>
  		</div>
  		<div className="Place2"> 
      		<img src={work} alt="Logo trabajo"></img>
      		<p> Trabajo </p>
  		</div>
  		<div id="motherH"  className="Place1">
      		<img className="imgWork" src={motherhIcon} alt=" Casa mamá"></img>  
      		<p> Casa  mamá</p>
  		</div>
         
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

export default MyRoutes;