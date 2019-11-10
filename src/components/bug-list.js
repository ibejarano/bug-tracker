import React from 'react';
import '../style/bug-table.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BugList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bugList: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/bugs')
        .then((res) => this.setState({
          bugList: res.data
        })
        )
        .catch(err => console.log('There is an error', err))
    };

    render(){

    const bugRows = this.state.bugList.map((bugRow, idx)=>{
        let createdDateParse = new Date( Date.parse(bugRow.createdAt))
        let updatedDateParse = new Date( Date.parse(bugRow.updatedAt))

        return(
            <tr key={idx}>
                <td> {bugRow._id.slice(-6) } </td>
                <td> {bugRow.severity} </td>
                <td> {bugRow.priority} </td>
                <td> {bugRow.state} </td>
                <td> {bugRow.resolution} </td>
                <td> {createdDateParse.toLocaleString()} </td>
                <td> {updatedDateParse.toLocaleString()} </td>
                <td> {bugRow.shortDescription} </td>
                <td> <Link to={`/update/${bugRow._id}`} > Edit </Link>  </td>
            </tr>
        );
    });

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
                    <th>Edit</th>
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