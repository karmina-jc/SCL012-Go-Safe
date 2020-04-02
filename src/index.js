import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseConfig from '../src/config/firebase';
import{
FirebaseAppProvider
} from 'reactfire';


ReactDOM.render((
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando con la App...'}>
      <App />
    </Suspense> 
  </FirebaseAppProvider>
  ), document.getElementById('root'));
  
  serviceWorker.unregister();