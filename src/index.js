import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<App />, document.getElementById('root'));

// Si desea que su aplicación funcione sin conexión y se cargue más rápido, puede cambiar
// anular el registro () para registrar () a continuación. Tenga en cuenta que esto viene con algunas trampas.
// Obtenga más información sobre los trabajadores de servicios: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 
