import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { searchApi } from "../../apis";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
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

    const searchPlacesByQuery = async(query: string) => {
        if(query.length < 3) return; // Todo: Limpiar el state de los lugares
        if(!state.userLocation) throw new Error("No se ha podido obtener la ubicación del usuario");
        
        const resp = await searchApi.get(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        })
        console.log(resp.data)

        return resp.data;
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
