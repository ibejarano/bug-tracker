import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { authenticationService } from '../services/authentication-services';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppNavbar(props) {
  const isLogged = authenticationService.currentUserValue ? true: false;
  const [logged, setLogged] = useState(isLogged)
  const classes = useStyles();

  const logout = () =>{
    setLogged(false);
    props.logout()
  }

  console.log(props)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Issue Tracker App
          </Typography>
          {!logged &&
            <div>
              <Button color="inherit" href='/login'>Login</Button>
              <Button color="inherit" href='/register'>Register</Button>
            </div>
          }
          {logged && <div>
            <Button color="inherit" href="/" >Home
            </Button>
            <Button color="inherit" href="/issue-log" > Issue Log
            </Button>
            <Button color="inherit" href="/report-issue" > Add Issue
            </Button>
            <Button color="inherit" onClick={logout}>Logout
            </Button>
          </div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
