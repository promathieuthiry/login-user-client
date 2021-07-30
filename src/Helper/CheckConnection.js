import FetchData from "./FetchData"
import EventEmitter from "./EventEmitter"


async function CheckConnection() {
    try {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('credentials'))
        if (dataFromLocalStorage) {
            const response = await FetchData(`/api/users/${dataFromLocalStorage.id}`, "GET");
            if (response) {
                return { isLoggedIn: true, userInfo: response }
            }
        }
        EventEmitter.emit('unauthorized')
        return { isLoggedIn: false, userInfo: null }
    } catch (error) {
        console.warn(error)
        EventEmitter.emit('unauthorized')
        return { isLoggedIn: false, userInfo: null }
    }
}

export default CheckConnection