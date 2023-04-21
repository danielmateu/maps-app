import { useContext } from 'react';
import { PlacesContext } from '../context';
import { LoadingAddress } from '.';

export const SearchResults = () => {

    const { places, isLoadingPlaces } = useContext(PlacesContext)

    if (isLoadingPlaces) {
        return (
            <LoadingAddress />
        )
    }

    if(places?.length === 0) {
        return <></>
    }

    return (
        <ul className="list-group mt-3">
            { 
                places?.map((place) => (
                    <li key={place.id} className="list-group-item list-group-item-action">
                        <h6>{place.place_name}</h6>
                        <p className="text-muted">{place.text}</p>
                        <button
                            className="btn btn-outline-primary btn-sm"
                        >Here!</button>
                    </li>
                ))
            }
        </ul>
    )
}
