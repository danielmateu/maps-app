import { Map } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer } from 'react';
import { mapReducer } from "./mapReducer";


export interface MapState {
    map?: Map;
    isMapReady: boolean;

}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({children}: Props) => {

    const [state, dispath] =useReducer(mapReducer, INITIAL_STATE)

    return (
        <MapContext.Provider value={{
                ...state
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
