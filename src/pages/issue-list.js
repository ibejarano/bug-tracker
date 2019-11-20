import React from 'react';
import '../style/bug-table.css';
import { Link } from 'react-router-dom';
import { issuesHandler } from '../handlers/issues';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issueList: [],
            isAdmin: false
        }
    }

    refreshIssueList() {
        issuesHandler.getAll()
            .then((data) => this.setState({
                issueList: data.issues,
                isAdmin: data.user.isAdmin
            })
            )
            .catch(err => console.log('There is an error', err))
    }

    componentDidMount() {
        this.refreshIssueList();
    };

    deleteIssue(id) {
        issuesHandler.deleteById(id)
            .then(res => console.log(res))
            .catch(err => console.log('Error ocurred!', err))
            .finally(() => this.refreshIssueList())
    }

    render() {
        const issueRows = this.state.issueList.map((issueRow, idx) => {
            let createdDateParse = new Date(Date.parse(issueRow.createdAt))
            let updatedDateParse = new Date(Date.parse(issueRow.updatedAt))

            return (
                <tr key={idx}>
                    <td>
                        <Link to={`/issue?id=${issueRow._id}`}>
                            {issueRow.title}
                        </Link></td>
                    <td> {issueRow.type} </td>
                    <td> {issueRow.status} </td>
                    <td> {issueRow.priority} </td>
                    <td> {issueRow.assignee} </td>
                    <td> {createdDateParse.toLocaleString()} </td>
                    <td> {updatedDateParse.toLocaleString()} </td>
                    {(this.state.isAdmin || this.state.isDev) &&
                        <td> <Link to={`/issue-edit?id=${issueRow._id}`}>
                            Edit
                   </Link> </td>}
                    {(this.state.isAdmin) && <td>
                        <button onClick={(props) => { this.deleteIssue(issueRow._id) }}
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
                        {(this.state.isAdmin || this.state.isDev) && <th>Edit</th>}
                        {(this.state.isAdmin) && <th> Delete </th>}
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
};

export default IssueList;