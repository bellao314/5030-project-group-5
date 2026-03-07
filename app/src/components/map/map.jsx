import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { SearchBox } from '@mapbox/search-js-react'
import InfoCard from '../info-card/card'

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css'

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const propertyApiBaseUrl = import.meta.env.VITE_PROPERTY_API_URL || 'http://127.0.0.1:5001';
const center = [-90.288248, 38.655563];

export default function InteractiveMap() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [inputValue, setInputValue] = useState("");

  const [selectedData, setSelectedData] = useState({
    zipCode: "Select a Zip",
    city: "",
    countyName: "",
    beforeValue: null,
    afterValue: null,
    beforeLabel: "4/30/2025",
    afterLabel: "5/31/2025",
    isLoading: false,
    error: ""
  });

  const loadPropertyValues = async (zipCode) => {
    setSelectedData((previousData) => ({
      ...previousData,
      zipCode,
      city: "",
      countyName: "",
      beforeValue: null,
      afterValue: null,
      isLoading: true,
      error: ""
    }));

    try {
      const response = await fetch(`${propertyApiBaseUrl}/property-value/${zipCode}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to load property data.");
      }

      setSelectedData({
        zipCode: payload.zipCode || zipCode,
        city: payload.city || "",
        countyName: payload.countyName || "",
        beforeValue: payload.beforeValue,
        afterValue: payload.afterValue,
        beforeLabel: payload.beforeLabel || "4/30/2025",
        afterLabel: payload.afterLabel || "5/31/2025",
        isLoading: false,
        error: ""
      });
    } catch (error) {
      setSelectedData((previousData) => ({
        ...previousData,
        zipCode,
        isLoading: false,
        error: error.message || "Could not load property data."
      }));
    }
  };

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
          const zipCode = feature.ZCTA5CE10 || feature.name || "Unknown";

          if (zipCode === "Unknown") {
            setSelectedData((previousData) => ({
              ...previousData,
              zipCode,
              isLoading: false,
              error: "Selected area does not include a ZIP code."
            }));
            return;
          }

          void loadPropertyValues(zipCode);
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
      city={selectedData.city}
      countyName={selectedData.countyName}
      beforeValue={selectedData.beforeValue}
      afterValue={selectedData.afterValue}
      beforeLabel={selectedData.beforeLabel}
      afterLabel={selectedData.afterLabel}
      isLoading={selectedData.isLoading}
      error={selectedData.error}
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