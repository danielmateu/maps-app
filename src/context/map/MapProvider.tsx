/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer, useContext, useEffect } from 'react';
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "..";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";


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

    const getRouteBetweenPoints = async (start: number[], end: number[]) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')}; ${end.join(',')}`);

        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
        kms = Math.round(kms * 100) / 100;

        let minutes = duration / 60;
        minutes = Math.round(minutes * 100) / 100;

        console.log({ kms, minutes });

        // const bounds = new LngLatBounds(
        //     start,
        //     start
        // );

        const bounds = new LngLatBounds();

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 100
        })

        // polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }
        // Todo: Limpiar polylines si existe
        if(state.map?.getLayer('RouteString')){
            state.map?.removeLayer('RouteString');
            state.map?.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#888',
                'line-width': 4
            }
        })
    }


    return (
        <MapContext.Provider value={{
            ...state,

            // Methods
            setMap,
            getRouteBetweenPoints
        }}
        >
            {children}
        </MapContext.Provider>
    )
}

