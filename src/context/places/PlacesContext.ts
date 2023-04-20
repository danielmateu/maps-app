import { createContext } from "react";

export interface placesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
}

export const PlacesContext = createContext<placesContextProps>({} as placesContextProps);