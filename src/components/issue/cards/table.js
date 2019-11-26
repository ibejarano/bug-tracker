import React from "react";
import { Link } from "react-router-dom";

import LoadingCircle from "../../loading"

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default function IssueTable({
  issues,
  isAdmin,
  deleteIssue,
  showAssignee = true
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell variant='head'  >Issue Title</TableCell>
            <TableCell variant='head' align="right">Status</TableCell>
            <TableCell variant='head' align="right">Type</TableCell>
            <TableCell variant='head' align="right">Priority</TableCell>
            {showAssignee && <TableCell variant='head' align="right">Assignee</TableCell>}
            <TableCell variant='head' align="right">Created At</TableCell>
            <TableCell variant='head' align="right">Update At</TableCell>
            {isAdmin && <TableCell align="right"> </TableCell>}
            {isAdmin && <TableCell align="right"> </TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          
            {issues.length ? ( issues.map(issue => (
              <TableRow key={issue.title} hover>
              <TableCell component="th" scope="row">
                <Link to={`/user/issue?q=${issue._id}`}>
                {issue.title}
                </Link>
              </TableCell>
              <TableCell align="right">{issue.type}</TableCell>
              <TableCell align="right">{issue.status}</TableCell>
              <TableCell align="right">{issue.priority}</TableCell>
              {showAssignee && (
                <TableCell align="right">
                  {issue.assignee ? issue.assignee.username : "Not Assignee"}
                </TableCell>
              )}
              <TableCell align="right">{issue.createdAt}</TableCell>
              <TableCell align="right">{issue.updatedAt}</TableCell>
              {isAdmin && (
                <TableCell align="right">
                  <Link to={`/user/issue-edit?id=${issue._id}`}>Edit</Link>
                </TableCell>
              )}
              {isAdmin && (
                <TableCell align="right">
                  <button
                    onClick={() => {
                      deleteIssue(issue._id);
                    }}
                    >
                    Delete
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))
          ) : (
            <TableRow>
            <TableCell colSpan={7}>
            <LoadingCircle />
            </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </Paper>
  );
}
