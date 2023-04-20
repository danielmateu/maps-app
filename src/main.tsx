import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp.tsx'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWRldi1iY24iLCJhIjoiY2xhNml6NzBtMDFnMTNvbXF4bWs3M3BzdyJ9.KVnHCs7UweqcqiKo5wFObA';

if(!navigator.geolocation){
    alert('Geolocation is not supported by your browser')
    throw new Error("Geolocation is not supported by your browser");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Loading/> */}
    <MapsApp/>
  </React.StrictMode>,
)
