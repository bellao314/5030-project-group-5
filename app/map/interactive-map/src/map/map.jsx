import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { SearchBox } from '@mapbox/search-js-react'

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css'

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const center = [-90.288248, 38.655563];

function MapBackground() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    mapboxgl.accessToken = accessToken

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center:  center,
      zoom: 11,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on('load', () => {
      mapRef.current.addSource('mo-zip-codes', {
        'type': 'geojson',
        'data': './data/mo_missouri_zip_codes_geo.min.json'
      });

      mapRef.current.addSource('tornado-polys', {
        'type': 'vector',
        'url': 'mapbox://bott003.a96dtqg1'
      });

      mapRef.current.addSource('tornado-paths', {
        'type': 'vector',
        'url': 'mapbox://bott003.2symb3m7'
      });

      mapRef.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'mo-zip-codes',
        layout: {},
        paint: {
          'line-color': 'red',
          'line-width': 1
        }
      });

      mapRef.current.addLayer({
        id: 'tornado-polys',
        type: 'fill',
        source: 'tornado-polys',
        'source-layer': 'damage_polys-89r1fg',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.5
        }
      });

      mapRef.current.addLayer({
        id: 'tornado-paths',
        type: 'line',
        source: 'tornado-paths',
        'source-layer': 'damage_paths-7hui0w',
        layout: {
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'red',
          'line-width': 3
        }
      });
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])


return (
  <>
    <div style={{
        margin: '10px 10px 0 0',
        width: 300,
        right: 50,
        top: 0,
        position: 'absolute',
        zIndex: 10 }}>
        <SearchBox
            accessToken={accessToken}
            map={mapRef.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            proximity={center}
            onChange={(d) => {
            setInputValue(d);
            }}
            marker
        />
    </div>
    <div id='map-container' ref={mapContainerRef} />
  </>
  )
}

export default MapBackground;