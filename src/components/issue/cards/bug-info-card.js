import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray({ info }) {
  const { title, type, status, priority } = info;
  const classes = useStyles();
  const chipData = [
    { key: 0, label: title, title: "Title" },
    { key: 1, label: type, title: "Type" },
    { key: 2, label: status, title: "Status" },
    { key: 3, label: priority, title: "Priority" }
  ];

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            label={data.title + ": " + data.label}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
