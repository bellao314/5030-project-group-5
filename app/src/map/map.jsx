import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { SearchBox } from '@mapbox/search-js-react'
import InfoCard from '../info-card/card'

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css'

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const center = [-90.288248, 38.655563];

export default function InteractiveMap() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [inputValue, setInputValue] = useState("");

  const [selectedData, setSelectedData] = useState({
    zipCode: "Select a Zip",
    fedFunds: 0,
    propertyValue: 0
  });

  useEffect(() => {
    mapboxgl.accessToken = accessToken

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
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
        id: 'tornado-polys-layer',
        type: 'fill',
        source: 'tornado-polys',
        'source-layer': 'damage_polys-89r1fg',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.5
        }
      });

      mapRef.current.addLayer({
        id: 'tornado-paths-layer',
        type: 'line',
        source: 'tornado-paths',
        'source-layer': 'damage_paths-7hui0w',
        layout: {
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'blue',
          'line-width': 3
        }
      });

      mapRef.current.addLayer({
        id: 'zip-codes',
        type: 'fill',
        source: 'mo-zip-codes',
        paint: {
          'fill-color': 'gray',
          'fill-opacity': 0.25,
          'fill-outline-color': 'black'
        }
      });

      mapRef.current.on('mouseenter', 'zip-codes', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer';
      });

      mapRef.current.on('mouseleave', 'zip-codes', () => {
        mapRef.current.getCanvas().style.cursor = '';
      });

      mapRef.current.on('click', 'zip-codes', (e) => {
        const features = mapRef.current.queryRenderedFeatures(e.point, {
          layers: ['zip-codes']
        });

        if (features.length > 0) {
          const feature = features[0].properties;
          
          setSelectedData({
            zipCode: feature.ZCTA5CE10 || feature.name || "Unknown",
            fedFunds: Math.floor(Math.random() * 1000000), // Placeholder logic
            propertyValue: Math.floor(Math.random() * 500000)
          });
        }
      });
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])


return (
  <>
    <InfoCard 
      zipCode={selectedData.zipCode}
      fedFunds={selectedData.fedFunds}
      propertyValue={selectedData.propertyValue}
    />
    <div style={{
        margin: '10px 10px 0 0',
        width: 300,
        right: 50,
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
};