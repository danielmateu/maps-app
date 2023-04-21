import { createContext } from "react";

export interface placesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];

    // Methods
    searchPlacesByQuery: (query: string) => Promise<any>;
}

export const PlacesContext = createContext<placesContextProps>({} as placesContextProps);