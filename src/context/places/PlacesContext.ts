import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface placesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces?: boolean;
    places?: Feature[];

    // Methods
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<placesContextProps>({} as placesContextProps);