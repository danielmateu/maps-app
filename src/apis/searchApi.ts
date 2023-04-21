import axios from "axios";


const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    params: {
        access_token: "pk.eyJ1IjoiZGFuaWRldi1iY24iLCJhIjoiY2xhNml6NzBtMDFnMTNvbXF4bWs3M3BzdyJ9.KVnHCs7UweqcqiKo5wFObA",
        limit: 4,
        language: "es",
    },
});

export default searchApi;