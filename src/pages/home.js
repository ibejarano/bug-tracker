import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/admin/dashboard';
import UserDashboard from '../components/user-dashboard';
import { userHandler } from '../handlers/users';

export default function HomePage() {

    const [userData, setUserData] = useState('');

    useEffect(() => {
        if(!userData)
            userHandler.getUserInfo().then(data => {
                setUserData(data)
            })
            .catch(err => console.log(err.toString()))
    },[userData])
    
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