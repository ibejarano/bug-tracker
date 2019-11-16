import React from 'react';
import '../style/bug-table.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BugList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bugList: [],
            isAdmin: false
        }
    }

    refreshBugList(){
        axios.get('http://localhost:5000/bugs', {
            headers: {
                Authorization: 'Bearer '+ JSON.parse(localStorage.currentUser)
            }
        })
        .then((res) => this.setState({
          bugList: res.data.bugs,
          isAdmin: res.data.user.isAdmin
        })
        )
        .catch(err => console.log('There is an error', err))
    }

    componentDidMount(){
        this.refreshBugList();
    };

    deleteBug(id){
        axios.delete(`http://localhost:5000/bugs/${id}`)
            .then(res => console.log(res.data))
            .then(()=> window.location='/')
            .catch(err => console.log('Error ocurred!',err))
    }



    render(){

    const bugRows = this.state.bugList.map((bugRow, idx)=>{
        let createdDateParse = new Date( Date.parse(bugRow.createdAt))
        let updatedDateParse = new Date( Date.parse(bugRow.updatedAt))


        return(
            <tr key={idx}>
                <td>
                    <Link to={`/bug?id=${bugRow._id}`}>
                     {bugRow._id.slice(-6) } 
                    </Link></td>
                <td> {bugRow.severity} </td>
                <td> {bugRow.priority} </td>
                <td> {bugRow.state} </td>
                <td> {bugRow.resolution} </td>
                <td> {createdDateParse.toLocaleString()} </td>
                <td> {updatedDateParse.toLocaleString()} </td>
                <td> {bugRow.shortDescription} </td>
                {(this.state.isAdmin || this.state.isDev )&& <td> <a to={`/update/${bugRow._id}`} > Edit </a>  </td> }
                {(this.state.isAdmin )&& <td> <button onClick={(props)=>{this.deleteBug(bugRow._id)}} >Delete</button> </td> }
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
                    {(this.state.isAdmin || this.state.isDev )&& <th>Edit Bug </th> }
                    {(this.state.isAdmin )&& <th> Delete Bug </th> }
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