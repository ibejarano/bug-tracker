import React, { useState } from "react";

import { issuesHandler } from "../handlers/issues";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function createOptionTags(opt, idx) {
  return (
    <MenuItem key={idx} value={opt}>
      {" "}
      {opt}{" "}
    </MenuItem>
  );
}

export default function ReportBugForm(props) {
  const classes = useStyles();
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [status, setStatus] = useState("");

  const handleIssueChange = e => {
    setIssueType(e.target.value);
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  const handleIssueTitleChange = e => {
    setIssueTitle(e.target.value);
  };

  const onSubmit = async function(e) {
    e.preventDefault();
    const params = {
      priority,
      type: issueType,
      status,
      title: issueTitle
    };
    try {
      const res = await issuesHandler.add(params);
      // TODO use this to display some info!
      console.log(res);
      if (res.status === 200) {
        props.history.push("/issue-log");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const issueTypeOptions = ["Bug", "Task", "Enhancement", "Proposal"].map(
    createOptionTags
  );
  const priorityOptions = ["Low", "Medium", "High", "Urgent!"].map(
    createOptionTags
  );
  const statusOptions = ["New", "Open", "Closed", "Paused"].map(
    createOptionTags
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Submit New Issue
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl className={classes.formControl} fullWidth required>
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

          <FormControl className={classes.formControl} fullWidth required>
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

          <FormControl className={classes.formControl} fullWidth required>
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
            fullWidth
            onChange={handleIssueTitleChange}
            label="Issue Title"
            className={classes.textField}
            margin="normal"
            value={issueTitle}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Issue
          </Button>
        </form>
      </div>
    </Container>
  );
}
