import React, {useState} from 'react';
import UsersList from './user-list';

export default function AdminDashboard() {

    const [usersList, setUsersList] = useState(null);

    const getUsers = () =>{
        if (usersList){
            setUsersList(null)
        } else{
            setUsersList(['Admin','test1','test2'])
        }
    }

    console.log(usersList)

    return (
        <div>
            <h1>
                Admin dashboard
            </h1>
            <p>
                This page is to manage admin resources
            </p>
            <div>
                <button onClick={getUsers}>Click me to see all the users!</button>
            </div>
            {usersList && <UsersList />}
        </div>
    )
}