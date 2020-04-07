import React from 'react';
import './App.css';
import Home from  './templates/home';
import MyRoutes from './templates/myRoutes';
import HomeRoutes from './templates/homeRoutes';

import CreateRouter from './templates/createRouter';
import SignUp from './templates/signUp';
import SignIn from './templates/signIn';
//import Login from './templates/login';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayMap from './components/DisplayMap';

function App() {
  return (
   <Router>
    <div>

      <Switch>        
        <Route path="/signin" component={SignIn}/>  
        <Route path="/signup" component={SignUp}/>
        <Route path="/myroutes" exact component={MyRoutes}/>
        <Route path="/homeroutes" exact component={HomeRoutes}/>
        <Route path="/createRouter" exact component={CreateRouter}/>
        <Route path="/" exact component={Home}/>     
         

      </Switch>
    </div>  
   </Router>
  );
    
}

export default App;
