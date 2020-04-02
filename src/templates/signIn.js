import React from 'react';
// import Button from '../components/button';
import Navbar from '../components/navbar';
//import Form from '../Components/form';
import facebook from '../pictures/facebook.svg';
import './signIn.css'


function SignIn(props) {
  return (
  <div className="signInPage"> 
    <Navbar/>
    <div className="orderPlace">
    <button className="btn btn-primary"> <img src={facebook} alt="facebookLogo"></img> Ingresa con Facebook</button>
    
    <button className="btn btn-success"> Iniciar sesión </button>
    </div>
  </div>
  )
}

export default SignIn;