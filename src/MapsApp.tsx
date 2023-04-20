
import { PlacesProvider } from './context/places/PlacesProvider'
import { HomePage } from './screens'
import { MapProvider } from './context/map/MapProvider';


export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomePage />
            </MapProvider>
        </PlacesProvider>
    )
}
