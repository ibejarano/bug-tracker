import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bugHandler } from '../services/bug-handler';
import { userHandler } from '../services/user-handler';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function createOptionTags(opt, idx) {
    return (
        <MenuItem key={idx} value={opt}> {opt} </MenuItem>
    )
}


export default function EditIssue(props) {

    const classes = useStyles();
    const [issueType, setIssueType] = useState('');
    const [priority, setPriority] = useState('');
    const [issueTitle, setIssueTitle] = useState('');
    const [status, setStatus] = useState('');
    const [assignees, setAsignees] = useState(['']);
    const [assignee, setAssignee] = useState('');
    const id = props.location.search.split('=')[1];

    const handleIssueChange = (e) => {
        setIssueType(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handleIssueTitleChange = (e) => {
        setIssueTitle(e.target.value)
    }

    const handleAssigneeChange = (e) => {
        setAssignee(e.target.value)
    }

    const onSubmit = async function (e) {
        e.preventDefault();

        console.log('Editing bug #', id)
        const urlPost = `http://localhost:5000/bugs/update/${id}`;
        const authHeaders = {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.currentUser)
            }
        }
        const params = {
            priority,
            type: issueType,
            status,
            title: issueTitle,
            assignee
        }
        try {
            const res = await axios.put(urlPost, params, authHeaders)
            // TODO use this to display some info!
            console.log(res)
            props.history.push('/issue-log')
        } catch (error) {
            console.log(error.toString())
        }

    };

    useEffect(() => {
        if (issueType === '') {
            try {
                async function fetchBugData() {
                    const bug = await bugHandler.getById(id);
                    setIssueType(bug.type);
                    setPriority(bug.priority);
                    setIssueTitle(bug.title);
                    setStatus(bug.status);
                    setAssignee(bug.assignee)
                }
                async function fetchUserData() {
                    const users = await userHandler.getAllUsers();
                    console.log(users)
                    setAsignees(users)
                }
                fetchBugData();
                fetchUserData();
            } catch (error) {
                console.log(error.toString());
            }
        }
    });

    const issueTypeOptions = ['Bug', 'Task', 'Enhancement', 'Proposal'].map(createOptionTags);
    const priorityOptions = ['Low', 'Medium', 'High', 'Urgent!'].map(createOptionTags);
    const statusOptions = ['New', 'Open', 'Closed', 'Paused'].map(createOptionTags);
    const assigneesOptions = assignees.map((assignee, idx) => createOptionTags(assignee.username, idx));


    return (
        <form className='form-container' onSubmit={onSubmit} >

            <FormControl className={classes.formControl} required >
                <InputLabel>Type</InputLabel>
                <Select
                    value={issueType}
                    onChange={handleIssueChange}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {issueTypeOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl} required >
                <InputLabel>Priority</InputLabel>
                <Select
                    value={priority}
                    onChange={handlePriorityChange}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {priorityOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl} required >
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {statusOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <TextField
                required
                onChange={handleIssueTitleChange}
                label="Issue Title"
                className={classes.textField}
                margin="normal"
                value={issueTitle}
            />

            <FormControl className={classes.formControl} required >
                <InputLabel>Assignee</InputLabel>
                <Select
                    value={assignee}
                    onChange={handleAssigneeChange}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {assigneesOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <button type='submit'>Submit new bug</button>
        </form>
    )
};