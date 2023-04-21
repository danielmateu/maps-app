
import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps {
    isMapReady: boolean;
    map?: Map;

    // Methods
    setMap: (map: Map) => void;
    getRouteBetweenPoints: (start: number[], end: number[]) => Promise<void>;
}

export const MapContext = /*#__PURE__*/createContext({} as MapContextProps);