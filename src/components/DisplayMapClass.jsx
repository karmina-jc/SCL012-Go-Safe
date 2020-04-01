import React, { Component } from 'react';

createRoute = () => {

  let shape = this.state.tapPosition
  let overlayName = 'OVERLAYTIER'
  let app_id = "BCARpYuX4JTbLbCE7nfW"
  let app_code = "UsxeE6O5hDR3RWxAwgjnDA"
  let paramURL = `http://cre.api.here.com/2/overlays/upload.json?map_name=${overlayName}&overlay_spec=[{"op":"override","shape":[${shape}],"layer":"LINK_ATTRIBUTE_FCN","data":{"VEHICLE_TYPES":"0"}}]&storage=readonly&app_id=${app_id}&app_code=${app_code}`

  paramURL = paramURL.replace(/\[/g, '%5B')
  paramURL = paramURL.replace(/\]/g, '%5D')
  paramURL = paramURL.replace(/\{/g, '%7B')
  paramURL = paramURL.replace(/\}/g, '%7D')

  console.log(paramURL)

  fetch(paramURL)
  .then(response => response.json())
  .then(()=> {
    let twaypoint0 = this.state.tapPosition[0],
    twaypoint1 = this.state.tapPosition[this.state.tapPosition.length],
    toverlays = 'OVERLAYTIER',
    tmode = "fastest;pedestrian;",
    turl = `http://cre.api.here.com/2/calculateroute.json?waypoint0=${twaypoint0}&waypoint1=${twaypoint1}&overlays=${toverlays}&mode=${tmode}&app_id=BCARpYuX4JTbLbCE7nfW&app_code=UsxeE6O5hDR3RWxAwgjnDA}&storage=readonly`;

    fetch(turl)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let route, routeShape, linestring;

        if (response.response.route) {
        // Pick the first route from the response:
        route = response.response.route[0];
        // Pick the route's shape:
        routeShape = route.leg[0];
        
        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString();
    
        for (let index = 0; index < routeShape.link.length; index++) {
          // console.log(routeShape.link[index].shape.length)
          for (let i = 0; i <= (routeShape.link[index].shape.length)-2; i ++) {
            // console.log(routeShape.link[index].shape[i])
            // console.log(routeShape.link[index].shape[i+1])
            linestring.pushLatLngAlt(routeShape.link[index].shape[i],routeShape.link[index].shape[i+1] );
            i++;
          }
        }   
    
        // Create a polyline to display the route:
        let routeLine1 = new H.map.Polyline(linestring, {
        style: { strokeColor: 'green', lineWidth: 5 }
        });
        
        
        // Add the route polyline and the two markers to the map:
        map.addObject(routeLine1);
        
        // Set the map's viewport to make the whole route visible:
        // map.getViewModel().setLookAtData({bounds: routeLine1.getBoundingBox()});
        }
        }, error => {
        console.log(error);
        });
        //draw polyline using shape in response
        }, error => {
        console.log(error);
      })

}

class DisplayMapClass extends Component {
  constructor(props) {
    super(props);
    this.createRoute = this.createRoute.bind(this);
  }

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

    //crea toma valores de geolocalizacion y crea marker en pantalla
    // Add event listener:
 
    map.addEventListener('tap', (event) => {
          let position = map.screenToGeo(
            event.currentPointer.viewportX,
            event.currentPointer.viewportY
          )
          const marker = new H.map.Marker(position)
          map.addObject(marker)
          this.setState({tapPosition: [...this.state.tapPosition, [position]]
          })
      });

    // MapEvents habilita el sistema de eventos
    // Behavior implementa interacciones predeterminadas para pan / zoom (también en entornos táctiles móviles)
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
      <button onClick={createRoute()}>Trazar Ruta</button>
      </div>
    );
  }
}

export default DisplayMapClass;