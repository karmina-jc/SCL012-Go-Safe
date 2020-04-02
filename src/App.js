import React, { Fragment } from 'react';
import './App.css';
import DisplayMap from './components/DisplayMap'
import Home from  './templates/home';
import MyRoutes from './templates/myRoutes';
import HomeRoutes from './templates/homeRoutes';
import logoApp from  './templates/pictures/Logo.jpeg';
import SignUp from '../src/templates/signUp';
//import Login from './templates/login';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
    return (   
      <div>
        <SignUp />
        

        <DisplayMap />
      </div> 
      );
  }


  export default App;
