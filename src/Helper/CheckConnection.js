import FetchData from "./FetchData"

async function CheckConnection() {
    try {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('credentials'))
        if (dataFromLocalStorage) {
            const response = await FetchData(`/api/users/${dataFromLocalStorage.id}`, "GET");
            if (response) {
                return true
            }
        }
        return false
    } catch (error) {
        console.warn(error)
        return false
    }
}

export default CheckConnection