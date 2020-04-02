import React from 'react';
//import Button from '../components/button';
import Navbar from '../Components/navbar';
import Form from '../Components/form';
import facebook from '../pictures/facebook.svg';
import './signUp.css'

function SignUp(props) {
  return (
  <div className="signUpPage">
    <Navbar/>
      <div className="orderPlace" >
        <button  className="btn btn-primary"><img src={facebook} alt="facebookLogo"></img>  Registrate con Facebook</button> 
        <input type="text" id="name" placeholder="Nombre y Apellido (requerido) " className="inputLogin" required/>
         <Form />
      </div>
    <p className="conditions"> AL REGISTRARTE ESTAS DE ACUERDO CON LOS TÉRMINOS Y CONDICIONES </p>
    <button  className="btn btn-success">Regístrate</button> 
  </div>
  )
}

export default SignUp;