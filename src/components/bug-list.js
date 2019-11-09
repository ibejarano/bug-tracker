import React from 'react';
import '../style/bug-table.css';

export default function BugList({list}){

    const bugRows = list.map((bugRow, idx)=>{
        return(
            <tr key={idx}>
                <td> {bugRow._id} </td>
                <td> {bugRow.severity} </td>
                <td> {bugRow.priority} </td>
                <td> {bugRow.state} </td>
                <td> {bugRow.resolution} </td>
                <td> {bugRow.createdAt} </td>
                <td> {bugRow.updatedAt} </td>
                <td> {bugRow.shortDescription} </td>
            </tr>
        )
    })

    return(
        <table className="bug-table">
            <thead>
                <tr className="bug-table-row" >
                    <th>#ID</th>
                    <th>Severity</th>
                    <th>Priority</th>
                    <th>State</th>
                    <th>Resolution</th>
                    <th>Creation date</th>
                    <th>Last Update</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {bugRows}
            </tbody>
        </table>
    );
};