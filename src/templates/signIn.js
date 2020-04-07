import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import Button from '../components/button';
import Navbar from '../templates/navbar';
import { useFirebaseApp} from 'reactfire';

import { Button } from 'reactstrap';

import './signIn.css'


function SignIn(props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const firebase = useFirebaseApp();
  
  const login = async()=>{
    await firebase.auth().signInWithEmailAndPassword(email,password);
  
  }


  return (
  <div className="signInPage"> 
    <Navbar/>
    <div className="orderPlace">
        <label htmlFor="email"> Correo Electrónico</label>
        <input type="email" id="email" onChange={ (ev)=> setEmail(ev.target.value) }   />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" onChange={ (ev)=> setPassword(ev.target.value) } />    

     
        <Button className="buttonGreen"><a href="/createRouter">Iniciar Sesión</a></Button>

    </div>
  </div>
  )
}


export default withRouter(SignIn);
  // <button className="btn btn-success" onClick={login}><Link to="/homeroutes">Iniciar Sesión</Link></button>

