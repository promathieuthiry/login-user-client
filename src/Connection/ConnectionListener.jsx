import React, { useEffect, useContext } from 'react'
import EventEmitter from '../Helper/EventEmitter'
import { Redirect, useHistory } from "react-router-dom"
import Credentials from '../Helper/Context';

function ConnectionListener() {

    let history = useHistory();
    const { loggedIn, setLoggedIn } = useContext(Credentials)

    useEffect(() => {
        const listener = EventEmitter.addListener('unauthorized', function () {
            history.push('/login')
            setLoggedIn(false)
            // const { credentials, setCredentials } = useContext(Credentials)
        })

        return () => { listener.remove() }
    }, [])


    return (
        <div>

        </div>
    )
}

export default ConnectionListener
