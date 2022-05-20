import axios from 'axios';

const URL = 'https://camul2022.pythonanywhere.com'

const searchWaypoints = async (origin: number, destination: number, setPath: any) => {

    await fetch(`${URL}/search/waypoints?beaconOrigin=${origin}&beaconDestination=${destination}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setPath(data)
        })
}

const mapBeacons = async (setBeacons: any) => {
    await fetch(URL + "/map/beacons")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setBeacons(data.beacons);
        });
}

export { searchWaypoints, mapBeacons }