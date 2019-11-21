import React, { useState, useEffect } from 'react';
import { authenticationService } from '../services/authentication-services';
import AdminDashboard from '../components/admin/dashboard';
import UserDashboard from '../components/user-dashboard';


export default function HomePage() {

    const [userData, setUserData] = useState('');

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

    console.log(userData)
    return (
        <div>
            {userData &&
                <div>
                    <h1> Bienvenido, {userData.username} ! </h1>
                </div>
            }

            {userData.isAdmin && 
                <AdminDashboard />
            }
            {!userData.isAdmin && 
                <UserDashboard />
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