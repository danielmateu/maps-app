import { useContext, useLayoutEffect, useRef } from 'react'
import { PlacesContext } from '../context/places/PlacesContext'
import { Loading } from './'
import mapboxgl from 'mapbox-gl';

export const MapView = () => {

    const { isLoading, userLocation } = useContext(PlacesContext);
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(!mapDiv.current) return;
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: userLocation,
            zoom: 14
        });
        map.addControl(new mapboxgl.NavigationControl());
        return () => map.remove();
    }, [userLocation])


    return (
        <div 
            ref={mapDiv}
            style={
                {
                    width: '100%',
                    height: '100%',
                    // backgroundColor: 'red',
                    position:'fixed',
                    top: 0,
                    left: 0,
            }}
            >
            {isLoading ? <Loading/> : `User location: ${userLocation?.join(', ')}`}
        </div>
    )
}
