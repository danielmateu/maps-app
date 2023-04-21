import {
    BtnMyLocation,
    MapView,
    // ReactLogo,
    SearchBar
} from "../components"


const HomePage = () => {
    return (
        <>

            <SearchBar />
            <BtnMyLocation />

            {/* <ReactLogo/> */}
            <MapView />
        </>
    )
}

export default HomePage