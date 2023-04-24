
export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                resolve([coords.longitude, coords.latitude]);
            },
            (error) => {
                reject(error);
                console.log(error);
                alert("Please enable location services");
            },
            { enableHighAccuracy: true }
        );
    });
}