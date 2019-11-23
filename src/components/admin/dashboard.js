import React, {useState} from 'react';
import UsersList from './user-list';

export default function AdminDashboard(props) {

    const [usersList, setUsersList] = useState(null);

    const getUsers = () =>{
        if (usersList){
            setUsersList(null)
        } else{
            setUsersList([])
        }
    }

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
            <div>
                <h3>My issues</h3>
                <ul>
                    {props.issues.map((issue,idx)=>{
                        return(
                            <li key={idx}>{issue.title}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}