import React from 'react';
import '../style/bug-table.css';

export default function AdminDashboard(){
    return(
        <div>
            <h1>
            Admin only dashboard
            </h1>
            <p>
                This page is to manage admin resources
            </p>
            <ol>
                <li>Edit/Delete Users</li>
                <li>Idem above with bugs</li>
            </ol>
        </div>
    )
}