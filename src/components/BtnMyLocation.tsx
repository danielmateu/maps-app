import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext);
    const { userLocation } = useContext(PlacesContext)

    const onClick = () => {
        if (!isMapReady) throw new Error("Map is not ready");
        if (!userLocation) throw new Error("User location is not ready");

        map?.flyTo({
            center: userLocation,
            zoom: 15,
            
        })
    }

    return (
        <button
            onClick={onClick}
            className="btn btn-primary search-btn"
            
        >Where am I?
        </button>
    )
}
