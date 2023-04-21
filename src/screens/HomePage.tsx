import {
    BtnMyLocation,
    MapView,
    // ReactLogo,
    SearchBar
} from "../components"


const HomePage = () => {
    return (
        <>
            <div
                className="location-container"
            >
                <BtnMyLocation />
                <SearchBar />
            </div>
            {/* <ReactLogo/> */}
            <MapView />
        </>
    )
}

export default HomePage