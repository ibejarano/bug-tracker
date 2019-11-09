import React from 'react';

export default function EditBugForm(props){
    return(
        <div>
            You are now in the page of bug id: {props.match.params.id}
        </div>
    )
}