import React from "react";
import { Link } from "react-router-dom";

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
            <TableCell>Issue Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Priority</TableCell>
            {showAssignee && <TableCell align="right">Assignee</TableCell>}
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Update At</TableCell>
            {isAdmin && <TableCell align="right"> </TableCell>}
            {isAdmin && <TableCell align="right"> </TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue.title} hover>
              <TableCell component="th" scope="row">
                {issue.title}
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
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
