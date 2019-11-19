import React, { useState, useEffect } from 'react';
import { authenticationService } from '../services/authentication-services';

export default function HomePage() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userData) {
            authenticationService.getUserInfo().then(data => {
                setUserData(data)
            })
        }
        else {
            console.log('User Already setted', userData)
        }

    })
    return (
        <div>
            {userData &&
                <div>
                    <h1> Bienvenido, {userData.username} ! </h1>
                </div>
            }
            {
                !userData &&
                <div>
                    <h1>Loading...</h1>
                </div>
            }
        </div>
    )
}