//TOMAR UNA FOTO
import React, { Component } from 'react';
import { resultContainer, map, ui } from 


class Capture extends Component {

  constructor(props) {
    super(props);
    this.state = {name: "Guiadev"};
  }



function capture {
    // Capturing area of the map is asynchronous, callback function receives HTML5 canvas
    // element with desired map area rendered on it.
    // We also pass an H.ui.UI reference in order to see the ScaleBar in the output.
    // If dimensions are omitted, whole veiw port will be captured
    map.capture(function (canvas) {
      if (canvas) {
        resultContainer.innerHTML = '';
        resultContainer.appendChild(canvas);
      } else {
        // For example when map is in Panorama mode
        resultContainer.innerHTML = 'Capturing is not supported';
      }
    }, [ui], 50, 50, 500, 200);
  }
  
  var resultContainer = document.getElementById('panel_DOS');
  
  // Create container for the "Capture" button
  var containerNode = document.createElement('div');
  containerNode.className = 'btn-group ';
  
  // Create the "Capture" button
  var captureBtn = document.createElement('input');
  captureBtn.value = 'Tomar Captura';
  captureBtn.type = '<br><br><br> button';
  captureBtn.className = 'btn btn-primary';
  
  // Add both button and container to the DOM
  containerNode.appendChild(captureBtn);
  mapContainer.appendChild(containerNode);
  
  // Step 7: Handle capture button click event
  captureBtn.onclick = function () {
    capture(resultContainer, map, ui);
  }; 


  render() {
    return (
      <div>
        <h1>Hola, {this.state.name}!</h1>
      </div>
    );
  }
}