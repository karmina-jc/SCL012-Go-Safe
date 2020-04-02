import React, { useState } from 'react';
import Navbar from '../templates/navbar';
//import facebook from '../pictures/facebook.svg';
import './signUp.css';
import 'firebase/auth';
import { useFirebaseApp} from 'reactfire';

function SignUp(props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const firebase = useFirebaseApp();
  

  const submit = async ()=>{
    await  firebase.auth().createUserWithEmailAndPassword(email,password);
  } 
  
  
  return (
  <div className="signUpPage">
    <Navbar/>
      <div className="orderPlace" >
        
        <label htmlFor="email"> Correo Electrónico</label>
        <input type="email" id="email" onChange={ (ev)=> setEmail(ev.target.value) }   />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" onChange={ (ev)=> setPassword(ev.target.value) } />
              
      
    <p className="conditions"> AL REGISTRARTE, ESTAS DE ACUERDO CON LOS TÉRMINOS Y CONDICIONES </p>
    <button  className="btn btn-success"onClick={submit}>Regístrate</button> 
    </div>
  </div>
  )
}

export default SignUp;