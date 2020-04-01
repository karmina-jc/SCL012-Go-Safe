import React, { Component } from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet'


const hereAcces = {
  key: 'luAvmoHbQUvxSVLucOwLZlrXOQ9JvIjUWuYPjqU1nsY',
  id: 'BCARpYuX4JTbLbCE7nfW',
  code: 'UsxeE6O5hDR3RWxAwgjnDA'
}

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.handleClick= this.handleClick.bind(this)
    this.newRoute= this.newRoute.bind(this)
    this.state = {

      tapPosition:[],
      markerPosition: {
        lat:null,
        lng:null},
      polyline:[]
    }
  }
  
  handleClick(event) {
    //console.log(event.latlng.lat, event.latlng.lng)
    let position = [event.latlng.lat, event.latlng.lng]
    console.log (position)
    this.setState({tapPosition: [...this.state.tapPosition, position]}) 
    
    let polyPosition = {lat:event.latlng.lat, lng:event.latlng.lng}
    this.setState({polyline: [...this.state.polyline, polyPosition]})

    let latPosition = event.latlng.lat
    let lngPosition = event.latlng.lng
    this.setState({markerPosition: {lat: latPosition, lng: lngPosition}})

    console.log(this.state.markerPosition)
  }

  async createPolyline (url){
    
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

    const data = await fetch (paramURL).then(res => res.json())
    console.log(data)


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
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />
            {this.state.polyline.length > 0 && 
               
             <Polyline 
              positions= {this.state.polyline}
              color='green'
              weight={3}
              > 
              <Marker position={center} />
              
              </Polyline> 
            }
                
        </Map>
        <button onClick={this.newRoute}>Crear Ruta</button>
      </div>
    );
  }
}

export default CreateRoute;