import React from 'react';
import '../style/bug-table.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BugList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugList: [],
            isAdmin: false
        }
    }

    refreshBugList() {
        axios.get('http://localhost:5000/bugs', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.currentUser)
            }
        })
            .then((res) => this.setState({
                bugList: res.data.issues,
                isAdmin: res.data.user.isAdmin
            })
            )
            .catch(err => console.log('There is an error', err))
    }

    componentDidMount() {
        this.refreshBugList();
    };

    deleteBug(id) {
        axios.delete(`http://localhost:5000/bugs/${id}`, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.currentUser)
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log('Error ocurred!', err))
    }

    render() {
        const bugRows = this.state.bugList.map((bugRow, idx) => {
            let createdDateParse = new Date(Date.parse(bugRow.createdAt))
            let updatedDateParse = new Date(Date.parse(bugRow.updatedAt))


            return (
                <tr key={idx}>
                    <td>
                        <Link to={`/issue?id=${bugRow._id}`}>
                            {bugRow.title}
                        </Link></td>
                    <td> {bugRow.type} </td>
                    <td> {bugRow.status} </td>
                    <td> {bugRow.priority} </td>
                    <td> {bugRow.assignee} </td>
                    <td> {createdDateParse.toLocaleString()} </td>
                    <td> {updatedDateParse.toLocaleString()} </td>
                    {(this.state.isAdmin || this.state.isDev) &&
                        <td> <Link to={`/issue-edit?id=${bugRow._id}`}>
                            Edit
                   </Link> </td>}
                    {(this.state.isAdmin) && <td>
                        <button onClick={(props) => { this.deleteBug(bugRow._id) }}
                        >Delete</button> </td>}
                </tr>
            );
        });
        return (
            <table className="bug-table">
                <thead>
                    <tr className="bug-table-row" >
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assignee</th>
                        <th>Creation date</th>
                        <th>Last Update</th>
                        {(this.state.isAdmin || this.state.isDev) && <th>Edit Bug </th>}
                        {(this.state.isAdmin) && <th> Delete Bug </th>}
                    </tr>
                </thead>
                <tbody>
                    {bugRows}
                </tbody>
            </table>
        );
    }
};

export default BugList;