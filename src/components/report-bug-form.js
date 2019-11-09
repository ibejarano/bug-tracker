import React from 'react';

function createOptionTags(opt){
    return(
        <option value={opt}> {opt} </option>
    )
}

export default function ReportBugForm({onSubmit}){
    const severityOptions = ['Risky', 'Unhandled', 'Terminal'];
    const priorityOptions = ['Low', 'Medium' ,'High', 'Urgent!'];
    const stateOptions = ['Open', 'Closed', 'Paused'];
    const resolutionOptions = ['Solved', 'Unsolved', 'In Progress'];

    const selectSeverity = severityOptions.map( createOptionTags )
    const selectPriority = priorityOptions.map( createOptionTags )
    const selectState = stateOptions.map( createOptionTags )
    const selectResolution = resolutionOptions.map( createOptionTags )

    return(
        <form classMame='form-container' action='http://localhost:5000/bugs/add' method='post' onSubmit={onSubmit} >
            <select name='severity' >
                {selectSeverity}
            </select>
            <select name='priority' required >
                {selectPriority}
            </select>
            <select name='state' >
                {selectState}
            </select>
            <select name='resolution' >
                {selectResolution}
            </select>
            <input name='shortDescription' type='text' placeholder='Description'/>
            <button type='submit'>Submit new bug</button>
        </form>
    )
}