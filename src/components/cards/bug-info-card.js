import React from 'react';

export default function BugInfoCard(props){
    const {info} = props;
    return(
        <ul>
            <li>id: {info._id}  </li>
            <li>Severity: {info.severity} </li>
            <li>Prority: {info.priority} </li>
            <li>State: {info.state} </li>
            <li>Resolution: {info.resolution} </li>
        </ul>
    )
}