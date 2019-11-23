import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/admin/dashboard';
import UserDashboard from '../components/user-dashboard';
import { userHandler } from '../handlers/users';

export default function HomePage() {

    const [userData, setUserData] = useState('');
    const [issues, setIssues] = useState([])

    useEffect(() => {
        if(!userData)
            userHandler.getUserInfo().then(data => {
                setUserData(data.user);
                if (data.issues.length){
                    setIssues(data.issues)
                }
            })
            .catch(err => console.log(err.toString()))
    },[userData])
    
    console.log(userData)

    return (
        <div>
            {userData.isAdmin && 
                <AdminDashboard issues={issues}/>
            }
            {!userData.isAdmin && 
                <UserDashboard issues={issues} />
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