import axios from 'axios';

const URL = 'https://camul2022.pythonanywhere.com'

const searchWaypoints = (origin: number, destination: number) => {

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