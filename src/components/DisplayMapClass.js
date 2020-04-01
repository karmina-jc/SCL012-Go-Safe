import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null
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
    let selecShape = []

    map.addEventListener('tap', (event) => {
        let position = map.screenToGeo(
          event.currentPointer.viewportX,
          event.currentPointer.viewportY
        )
        selecShape.push([position])
        console.log(selecShape)
        const marker = new H.map.Marker(position)
        map.addObject(marker)
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
      <
      div ref = {
        this.mapRef
      }
      style = {
        {
          height: "500px"
        }
      }
      />
    );
  }
}