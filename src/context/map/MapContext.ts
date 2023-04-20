
import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps {
    isMapReady: boolean;
    map?: Map;
}

export const MapContext = /*#__PURE__*/createContext({} as MapContextProps);