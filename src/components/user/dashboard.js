import React, { useState, useEffect } from "react";
import { userHandler } from "../../handlers/users";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import IssueList from '../issue/cards/table';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function UserHome(props) {
  // some title
  // card with my issues
  // card with my activities (blank for now)
  // card with my data
  // card with a to-do?
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    async function fetchData() {
      const { user, issues } = await userHandler.getUserInfo();
      setIssues(issues);
      setUser(user);
    }
    console.log("effect running");
    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <h2>User info</h2>
          <h3>Username: {user.username}</h3>
          <h3>Email: {user.email}</h3>
        </Paper>
      </Grid>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <h2>Last activity</h2>
          <p>Under construction...</p>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
          <IssueList issues={issues} showAssignee={false} />
      </Grid>
    </Grid>
  );
}
