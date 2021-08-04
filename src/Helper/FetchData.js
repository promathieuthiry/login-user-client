import EventEmitter from "./EventEmitter"

async function FetchData(url, method, body) {
    const credentials = await JSON.parse(localStorage.getItem('credentials'))
    if (credentials) {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'x-auth-token': credentials.token },
        };
        if (body) { requestOptions.body = JSON.stringify(body) }
        const route = `${process.env.REACT_APP_API_BASE_URL}${url}`
        try {
            const response = await fetch(route, requestOptions)
            if (response.status === 401) {
                EventEmitter.emit('unauthorized')
                return false
            }
            return response.json()
        }
        catch (error) {
            console.warn(error)
            return EventEmitter.emit('unauthorized')
        }
    }
    return EventEmitter.emit('unauthorized')
}

export default FetchData;


   // console.log(console.log(`%c ________________________________________
            // < error >
            //  ----------------------------------------

            //         \\   ^__^
            //          \\  (oo)\\_______
            //             (__)\\       )\\/\\
            //                 ||----w |
            //                 ||     ||`, "font-family:monospace"))