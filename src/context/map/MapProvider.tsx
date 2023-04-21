/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer, useContext, useEffect } from 'react';
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "..";


export interface MapState {
    map?: Map;
    isMapReady: boolean;
    markers?: Marker[];

}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispath] = useReducer(mapReducer, INITIAL_STATE);

    const { places } = useContext(PlacesContext)

    useEffect(() => {
        state.markers?.forEach(marker => marker.remove())
        const newMarkers: Marker[] = [];

        for (const place of places!) {
            const [lng, lat] = place.center;
            const popup = new Popup().setHTML(`
            <h4>${place.place_name}</h4>
            <p>${place.place_name_es}</p>
            `);

            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!);

            newMarkers.push(newMarker);
        }

        // Todo: Limpiar polylines
        dispath({
            type: 'setMarkers',
            payload: newMarkers
        })

        // Todo: Nuevos marcadores

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [places])






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
