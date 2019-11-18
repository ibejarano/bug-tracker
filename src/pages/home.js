import React, { useState } from 'react';
import { authenticationService } from '../services/authentication-services';

export default function HomePage(){

    const [userData , setUserData ] = useState({});

    authenticationService.getUserInfo().then( data => {
        setUserData(data)
    })

    return(
        <div>
        { userData &&
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