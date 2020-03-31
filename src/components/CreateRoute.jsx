import React, { Component } from 'react';

const hereCredentials = {
    id: 'BCARpYuX4JTbLbCE7nfW',
    code: 'UsxeE6O5hDR3RWxAwgjnDA'
}

const customRoutesURL = () => { `http://cre.api.here.com/2/overlays/upload.jso?map_name=OVERLAYBLOCKROAD&overlay_spec=[{"op":"override","shape":[[50.10765,8.68774],[50.10914,8.68771]],"layer":"LINK_ATTRIBUTE_FCN","data":{"VEHICLE_TYPES":"0"}}]&storage=readonly&app_id=${hereCredentials.id}&app_code=${hereCredentials.code}`
}

class DisplayMapClass extends Component {
  constructor(props) {
      super(props)
      this.state ={

      }
  }

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
          apikey: "kgSdjqerT-AJ-VhQvIwifffAhb9AuVu7LK3gMkbIweA"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}

export default DisplayMapClass;