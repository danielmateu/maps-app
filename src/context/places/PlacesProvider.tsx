import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { searchApi } from "../../apis";
import { PlacesResponse, Feature } from '../../interfaces/places';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces?: boolean;
    places?: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation().then((location) => {
            dispatch({
                type: 'setUserLocation',
                payload: location
            })
        })
    }, [])

    const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
        if (query.length < 0) return [];
        // Todo: Limpiar el state de los lugares

        if (!state.userLocation) throw new Error("No se ha podido obtener la ubicación del usuario");

        dispatch({ type: 'setLoadingPlaces' })

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        })
        // console.log(resp.data.features[0])
        dispatch({ type: 'setPlaces', payload: resp.data.features })

        return resp.data.features;
    }


    return (
        <PlacesContext.Provider
            value={{
                ...state,

                // Methods
                searchPlacesByQuery

            }}>
            {children}
        </PlacesContext.Provider>


    )
}
