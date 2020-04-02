import * as React from 'react';
import gsIcon from './img/icono-mapa.png'


const hereAcces = {
  key: 'luAvmoHbQUvxSVLucOwLZlrXOQ9JvIjUWuYPjqU1nsY',
  id: 'BCARpYuX4JTbLbCE7nfW',
  code: 'UsxeE6O5hDR3RWxAwgjnDA'
}


export class DisplayMapClass extends React.Component {
   mapRef = React.createRef();
   
   constructor(props) {
    super(props);
    this.newRoute= this.newRoute.bind(this);
    this.state = {

      map: null,
      tapPosition: [],     
      polyline:[],
      markerPosition: []
    }
  }

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: hereAcces.key
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
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    //crea toma valores de geolocalizacion y crea marker en pantalla

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

    // MapEvents habilita el sistema de eventos
    // Behavior implementa interacciones predeterminadas para pan / zoom (también en entornos táctiles móviles)
    // Esta variable no se usa y está presente con fines explicativos
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Cree los componentes de la interfaz de usuario predeterminados para permitir que el usuario interactúe con ellos
    // Esta variable no se usa
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({
      map: {map}
    });

  }  

    async newRoute() {
      
      let shape = []
      let shapeA = this.state.tapPosition.map(e => shape.push('['+e+']'))
      let overlayName = 'OVERLAYTIER'
      let paramURL = `http://cre.api.here.com/2/overlays/upload.json?map_name=${overlayName}&overlay_spec=[{"op":"override","shape":[${shape}],"layer":"LINK_ATTRIBUTE_FCN","data":{"VEHICLE_TYPES":"0"}}]&storage=readonly&app_id=${hereAcces.id}&app_code=${hereAcces.code}`

      paramURL = paramURL.replace(/\[/g, '%5B')
      paramURL = paramURL.replace(/\]/g, '%5D')
      paramURL = paramURL.replace(/\{/g, '%7B')
      paramURL = paramURL.replace(/\}/g, '%7D') 
    
      let dataOverlay = await fetch (paramURL)
      let data = dataOverlay.json()      
      .then(() => {
        let twaypoint0 = this.state.tapPosition[0],
        twaypoint1 = this.state.tapPosition[this.state.tapPosition.length-1],
        toverlays = 'OVERLAYTIER',
        tmode = "fastest;pedestrian;",
        turl = `http://cre.api.here.com/2/calculateroute.json?waypoint0=${twaypoint0}&waypoint1=${twaypoint1}&overlays=${toverlays}&mode=${tmode}&app_id=${hereAcces.id}&app_code=${hereAcces.code}&storage=readonly`;

        console.log(data)
      
      })
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
      <button
        onClick={this.newRoute}
        >Crear Ruta
      </button>
    </div>
    );
  }
}