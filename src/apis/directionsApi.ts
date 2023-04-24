import axios from "axios";


const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    params: {
        acces_token: import.meta.env.VITE_MAPBOX_TOKEN,
        alternatives: false,
        language: "es",
        geometries: "geojson",
        overview: "simplified",
        steps: false,
    },
});

export default searchApi;