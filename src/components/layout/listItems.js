import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { userHandler } from "../../handlers/users";

const mainList = [
  {
    name: 'Home',
    path: '',
    icon: <DashboardIcon />
  },
  {
    name: "Users",
    path: 'list',
    icon: <PeopleIcon />
  },
  {
    name: "Issues Log",
    path: "issue-log",
    icon: <ListAltIcon />
  },
  {
    name: "Report Issue",
    path: "report-issue",
    icon: <BarChartIcon />
  },
  {
    name: "Reports",
    path: "",
    icon: <BarChartIcon />
  }
]

function MaterialIconsList({name, path,icon} , idx , absPath) {
  return (
    <Link to={`${absPath}/${path}`} key={idx}>
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
}

async function logout() {
  try {
    console.log("Logging out");
    const res = await userHandler.logout();
    console.log(res);
    window.location = '/'
  } catch (error) {
    console.log(error.toString());
  }
};

export function mainListItems(absPath){ return(
  <div>
    {mainList.map((item , idx) => MaterialIconsList(item,idx, absPath) )}
  </div>
)};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);

export const logoutItem = (
  <div>
    <ListItem button onClick={logout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

