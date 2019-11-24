import React from 'react';

export default function AdminDashboard(props) {
    return (
        <div>
            <h1>
                User Dashboard
            </h1>
            <ul>
                {props.issues.map((issue,idx)=>{
                    return(
                        <li key={idx}>{issue.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}