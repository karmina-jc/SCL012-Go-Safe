import React, { Component } from 'react';

createRoute = () => {
  const data = await fetch(url).then(res => res.json())
  console.log(data)

  let route, routeShape;

  if (data.response.route) {
  // Pick the first route from the response:
  route = data.response.route[0];
  // Pick the route's shape:
  routeShape = route.leg[0];

  for (let index = 0; index < routeShape.link.length; index++) {
    // console.log(routeShape.link[index].shape.length)
    for (let i = 0; i <= (routeShape.link[index].shape.length)-2; i ++) {
      // console.log(routeShape.link[index].shape[i])
      // console.log(routeShape.link[index].shape[i+1])
      let polylineShape = (routeShape.link[index].shape[i],routeShape.link[index].shape[i+1] );
      i++;

      this.setState({polyline: [...this.state.polyline, polylineShape]})
    }
  } 
  console.log(this.state.polyline)

  }

}

class DisplayMapClass extends Component {
  constructor(props) {
    super(props);
    this.createRoute = this.createRoute.bind(this);
  }
  captureRef = React.createRef();
  mapRef = React.createRef();
  state = {
    map: null,
    tapPosition:[]
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "{kgSdjqerT-AJ-VhQvIwifffAhb9AuVu7LK3gMkbIweA}"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Crea una instancia del mapa
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map, {
        // Este mapa está centrado en Europa
        center: {
          lat:  -33.4569397,
          lng: -70.6482697
        },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    function capture(resultContainer, map, ui) {
      // Capturing area of the map is asynchronous, callback function receives HTML5 canvas
      // element with desired map area rendered on it.
      // We also pass an H.ui.UI reference in order to see the ScaleBar in the output.
      // If dimensions are omitted, whole veiw port will be captured
      map.capture(function(canvas) {
        if (canvas) {
          resultContainer.innerHTML = '';
          resultContainer.appendChild(canvas);
        } else {
          // For example when map is in Panorama mode
          resultContainer.innerHTML = 'Capturing is not supported';
        }
      }, [ui], 50, 50, 500, 200);
    }
    
  
    // Step 1: initialize communication with the platform
    let mapContainer = this.mapRef.current

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());
 // Step 4: Create the default UI

    // Step 6: Create "Capture" button and place for showing the captured area
    let resultContainer = this.captureRef.current
     
    // Step 7: Handle capture button click event
    captureBtn.onclick = function() {
      capture(resultContainer, map, ui);
    };        


    // Esta variable no se usa y está presente con fines explicativos
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Cree los componentes de la interfaz de usuario predeterminados para permitir que el usuario interactúe con ellos
    // Esta variable no se usa
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({
      map
    });

  } 


  componentWillUnmount() {
    // Limpieza después del mapa para evitar pérdidas de memoria cuando este componente sale de la página
    this.state.map.dispose();
    
  }

  render() {
    return (
      // Establece una altura en el mapa para que se muestre
      <div>
      <div ref = {
        this.mapRef
      }
      style = {
        {
          height: "500px"
        }
      }
      > 
      </div>
      <div ref = {
        this.captureRef
      }
      style = {
        {
          height: "300px"
        }
      }
      > 
      </div>      
      <button onClick={createRoute()}>Trazar Ruta</button>
      </div>
    );
  }
}

export default DisplayMapClass;