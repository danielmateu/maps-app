import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingAddress } from '.';

export const SearchResults = () => {

    const { places, isLoadingPlaces } = useContext(PlacesContext)
    const { map } = useContext(MapContext)

    const [activeId, setActiveId] = useState('')

    const onPlaceClick = (place: any) => {

        const [lng, lat] = place.center;
        setActiveId(place.id);
        map?.flyTo({
            center: [lng, lat],
            zoom: 14
        })
    }

    if (isLoadingPlaces) {
        return (
            <LoadingAddress />
        )
    }

    if (places?.length === 0) {
        return <></>
    }

    return (
        <ul className="list-group mt-3">
            {
                places?.map((place) => (
                    <li
                        key={place.id}
                        className={`list-group-item list-group-item-action ${activeId === place.id ? 'active' : ''}`}
                        onClick={() => onPlaceClick(place)}
                    >
                        <h6>{place.place_name}</h6>
                        <p className="">{place.text}</p>
                        <button
                            className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
                        >Here!</button>
                    </li>
                ))
            }
        </ul>
    )
}
