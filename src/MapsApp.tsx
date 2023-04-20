
import { PlacesProvider } from './context/places/PlacesProvider'
import {HomePage} from './screens'


export const MapsApp = () => {
    return (
        <PlacesProvider>
            <HomePage />
        </PlacesProvider>
    )
}
