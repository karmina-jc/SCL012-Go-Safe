import React, { Component } from 'react';
import './form.css'

class Form extends Component {
  render() {
      return (
          <div className="orderPlace"> 
              <input type="email" id="email" placeholder="Correo electrónico" className="inputLogin" required/>
              <input type="password" id="password" placeholder="Contraseña" className="inputLogin" required />
          </div>
      );
  }
}

export default Form;
