import React from 'react';

export default function BugInfoCard(props) {
    const { info } = props;
    return (
        <ul>
            <li>Title: {info.title} </li>
            <li>Type: {info.type} </li>
            <li>Status: {info.status} </li>
            <li>Priority: {info.priority} </li>
        </ul>
    )
}