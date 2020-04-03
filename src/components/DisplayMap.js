import * as React from 'react';
import gsIcon from './img/icono-mapa.png'


const hereAcces = {
  key: 'luAvmoHbQUvxSVLucOwLZlrXOQ9JvIjUWuYPjqU1nsY',
  id: 'BCARpYuX4JTbLbCE7nfW',
  code: 'UsxeE6O5hDR3RWxAwgjnDA'
}
let H = window.H;
let platform = new H.service.Platform({
  apikey: hereAcces.key
});

let defaultLayers = platform.createDefaultLayers();


class DisplayMap extends React.Component {
   captureRef = React.createRef();
   mapRef = React.createRef();
   
   constructor(props) {
    super(props);
    this.newRoute= this.newRoute.bind(this);
    this.newRoute= this.takeCapture.bind(this)
    
    this.state = {

      map: null,
      tapPosition: [],     
      polyline:[],
      markerPosition: []
    }
  }

  componentDidMount() {

    // Crea una instancia del mapa
    let map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map, {
      // Mapa centrado en Santiago
        center: {
          lat:  -33.4569397,
          lng: -70.6482697
        },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    //crea toma valores de geolocalizacion y crea marker en pantalla ademas 

    map.addEventListener('tap', (event) => {
        let position = map.screenToGeo(
          event.currentPointer.viewportX,
          event.currentPointer.viewportY
        )
        let tapCoordinates = [position.lat, position.lng]
        let lineCoordinates = {lat: position.lat, lng: position.lng}

        console.log(lineCoordinates)
       
        this.setState({tapPosition: [...this.state.tapPosition, tapCoordinates]})
        this.setState({polyline: [...this.state.polyline, lineCoordinates]})

        let icon = new H.map.Icon(gsIcon)        
        const marker = new H.map.Marker({lat:position.lat, lng:position.lng}, {icon: icon})
        map.addObject(marker)

        if (this.state.polyline.length > 0) {

          let linestring =  new H.geo.LineString();          
          this.state.polyline.forEach(e => {
            return linestring.pushPoint(e);
          })
    
          const routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'green', lineWidth: 4 }});
          map.addObject(routeLine)
        } 
        console.log(this.state.polyline)
        console.log(this.state.tapPosition)

    });

    // Behavior implementa interacciones predeterminadas para pan / zoom (también en entornos táctiles móviles)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Cree los componentes de la interfaz de usuario predeterminados para permitir que el usuario interactúe con ellos
    // Esta variable no se usa
    let ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({
      map: {map}
    });

  }  

  // Toma aptura de ruta 
    async takeCapture() {

      let map = this.state.map.map
      let ui = H.ui.UI.createDefault(map, defaultLayers);
       
      window.addEventListener('resize', () => map.getViewPort().resize());
      
      let resultContainer = this.captureRef.current
      
      map.capture(function(canvas) {
          if (canvas) {
            resultContainer.innerHTML = '';
            resultContainer.appendChild(canvas);
          } else {
            // For example when map is in Panorama mode
            resultContainer.innerHTML = 'Capturing is not supported';
          }
        }, [ui]);        

    }

    //toma valores de coordenadas geograficas y manda request a la API costume route para guardar overlay
    async newRoute() {
      
      let shape = []
      let shapeA = this.state.tapPosition.map(e => shape.push('['+e+']'))
      let overlayName = 'OVERLAYTIER'
      let paramURL = `http://cre.api.here.com/2/overlays/upload.json?map_name=${overlayName}&overlay_spec=[{"op":"override","shape":[${shape}],"layer":"LINK_ATTRIBUTE_FCN","data":{"VEHICLE_TYPES":"0"}}]&storage=readonly&app_id=${hereAcces.id}&app_code=${hereAcces.code}`

      paramURL = paramURL.replace(/\[/g, '%5B')
      paramURL = paramURL.replace(/\]/g, '%5D')
      paramURL = paramURL.replace(/\{/g, '%7B')
      paramURL = paramURL.replace(/\}/g, '%7D') 
    
      await fetch(paramURL).then(res => console.log(res.json()))      
      
      this.takeCapture()     
    }        

  componentWillUnmount() {
    // Limpieza después del mapa para evitar pérdidas de memoria cuando este componente sale de la página
    this.state.map.dispose();
  }
 
  render() {
    return (
    // Establece una altura en el mapa para que se muestre
    <div>  
      <div 
      ref = {this.mapRef}
      style = {
        {
          height: "500px"
        }
      }
      >       
      </div>
      <div 
      ref = {this.captureRef}
      style = {
        {
          height: "200px"
        }
      }
      >       
      </div>
      <button
        onClick={this.newRoute}
        >Guardar Ruta
      </button>
    </div>
    );
  }
}

export default DisplayMap;