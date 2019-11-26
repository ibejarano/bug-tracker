import React, { useState, useEffect } from "react";
import { userHandler } from "../../handlers/users";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import IssueList from "../issue/cards/table";
import LoadingCicle from "../loading";

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
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState({ username: "", email: "", activities: [] });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePasswordConfChange = e => {
    setPasswordConf(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      console.log("Changing password");
      e.preventDefault();
      const id = user._id;
      const params = { password, passwordConf };
      await userHandler.changePassword(id, params);
    } catch (error) {
      console.log("Error changing password:", error.toString());
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await userHandler.getUserInfo();
      console.log(res);
      const { user, issues } = res;
      setIssues(issues);
      setUser(user);
    }
    console.log("effect running");
    fetchData();
  }, []);
  console.log(user);
  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          {user.username === "" ? (
            <LoadingCicle />
          ) : (
            <div>
              <Typography>User info</Typography>
              <Typography>Username: {user.username}</Typography>
              <Typography>Email: {user.email}</Typography>
            </div>
          )}
        </Paper>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
          />
          <input
            type="password"
            name="passwordConf"
            onChange={handlePasswordConfChange}
            value={passwordConf}
          />
          <button type="submit">Change Password</button>
        </form>
      </Grid>
      {/* Chart */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <h2>Last activity</h2>
          {user.username === "" ? (
            <LoadingCicle />
          ) : (
            <ul>
              {user.activities.map((activity, idx) => {
                return <li key={idx}>{activity}</li>;
              })}
            </ul>
          )}
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <IssueList issues={issues} showAssignee={false} />
      </Grid>
    </Grid>
  );
}
