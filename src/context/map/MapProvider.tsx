import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
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

    const [state, dispath] =useReducer(mapReducer, INITIAL_STATE);

    const setMap = (map: Map) => {

        const myLocationPopup = new Popup().setHTML(`
        <h4>aquí estoy</h4>
        <p>En algún lugar del mundo</p>
        `);
        

        new Marker({
            draggable: true,
            color: 'red'
        })
        .setLngLat(map.getCenter())
        .addTo(map)
        .setPopup(myLocationPopup)

        dispath({
            type: 'setMap',
            payload: map
        })
    }

    return (
        <MapContext.Provider value={{
                ...state,

                // Methods
                setMap,
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
