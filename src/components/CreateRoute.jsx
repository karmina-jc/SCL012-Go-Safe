import React, { Component } from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet'
import gsIcon from './img/GoSafe-icon.png'



const hereAcces = {
  key: 'luAvmoHbQUvxSVLucOwLZlrXOQ9JvIjUWuYPjqU1nsY',
  id: 'BCARpYuX4JTbLbCE7nfW',
  code: 'UsxeE6O5hDR3RWxAwgjnDA'
}

const goSafeIcon = new Icon({
  iconUrl: "./img/GoSafe-icon2.svg",
  iconSize: [25, 25]
})

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.handleClick= this.handleClick.bind(this)
    this.newRoute= this.newRoute.bind(this)
    this.state = {

      tapPosition:[],
      markerPosition: [],
      polyline:[]
    }
  }
  
  handleClick(event) {
    //console.log(event.latlng.lat, event.latlng.lng)
    let position = [event.latlng.lat, event.latlng.lng]
    this.setState({tapPosition: [...this.state.tapPosition, position]}) 
        
    let mPosition = {lat: event.latlng.lat, lng: event.latlng.lng}
    this.setState({...this.state.polyline, markerPosition: mPosition})
    
    console.log(this.state.markerPosition)
  }

  
  async createPolyline(url){

    const data = await fetch(url).then(res => res.json())
    console.log(data)

    const dataShape = data.response.route[0].leg[0].link;
    for (let index = 0; index < dataShape.length; index++) {
      for (let i = 0; i <= (dataShape[index].shape.length)-2; i ++) {
        
        let shapePolyline = {lat: dataShape[index].shape[i], lng: dataShape[index].shape[i+1]};
        this.setState({polyline: [...this.state.polyline, shapePolyline]})
      }
    } 

    console.log(this.state.polyline)
    
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

    console.log(paramURL)

    await fetch (paramURL).then(res => res.json()).then(() => {
      let twaypoint0 = this.state.tapPosition[0],
      twaypoint1 = this.state.tapPosition[this.state.tapPosition.length-1],
      toverlays = 'OVERLAYTIER',
      tmode = "fastest;pedestrian;",
      turl = `http://cre.api.here.com/2/calculateroute.json?waypoint0=${twaypoint0}&waypoint1=${twaypoint1}&overlays=${toverlays}&mode=${tmode}&app_id=${hereAcces.id}&app_code=${hereAcces.code}&storage=readonly`;
      
      this.createPolyline(turl)      
    })
  }

  render() {
  
    const center = {lat:-33.447487, lng:-70.673676}
    const zoom = 12
    return (
      <div>
        <Map
          center={center}
          zoom={zoom}
          onClick={this.handleClick}          
          >           
            <TileLayer
              attribution="&copy; HERE 2020"
              url={`https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=${hereAcces.id}&app_code=${hereAcces.code}&ppi=320`}
            />
                        
            {this.state.polyline.length > 0 && 
              <div>             
              <Polyline 
                positions= {this.state.tapPosition}
                color='green'
                weight={3}
              >
              </Polyline> 
              <Marker 
                position={this.state.markerPosition}
                Icon={gsIcon}
                iconSize={[25, 25]}               
               />
              </div> 
            }
            
                
        </Map>
        <button onClick={this.newRoute}>Crear Ruta</button>
      </div>
    );
  }
}

export default CreateRoute;