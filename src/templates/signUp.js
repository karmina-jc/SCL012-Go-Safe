import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from '../templates/navbar';
import { Button } from 'reactstrap';

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
        

        <label className="email"  htmlFor="email"> Correo Electrónico</label>
        <input className="email2" type="email" id="email" onChange={ (ev)=> setEmail(ev.target.value) }   />
        <label htmlFor="password">Contraseña</label>
        <input className="email2" type="password" id="password" onChange={ (ev)=> setPassword(ev.target.value) } />
         
              
      
    <p className="conditions"> AL REGISTRARTE, ESTAS DE ACUERDO CON LOS TÉRMINOS Y CONDICIONES </p>
    <div className="boton col-xs-2"> 
    <Button className="buttonGreen" onClick={submit}><Link to="/signin">Registrarse</Link></Button> 
    </div>
    

    </div>
  </div>
  )
}

export default withRouter(SignUp);