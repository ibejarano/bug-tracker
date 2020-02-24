import React from 'react';
import {Route, Switch} from 'react-router-dom';

import IssueLog from '../components/issue-log';
import IssueDetails from '../components/issue-details';
import ReportIssue from '../components/issue-report';
import EditIssue from '../components/issue-edit';
import UserList from '../components/admin/user-list';
import Dashboard from '../components/user-dashboard';
import Sidebar from '../components/sidebar';
import Componentbar from '../components/componentbar';

export default function Home(props) {
  const {match} = props;
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <RouteWrapper section="Inicio" open={open} handler={toggleOpen}>
          <Dashboard />
        </RouteWrapper>
      </Route>
      <Route path={`${match.path}/issue`} >
        <RouteWrapper section="Issue Details" open={open} handler={toggleOpen}>
          <IssueDetails />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/issue-log`}>
        <RouteWrapper section="Lista de Issues" open={open} handler={toggleOpen}>
          <IssueLog />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/list`}>
        <RouteWrapper section="Lista de usuarios" open={open} handler={toggleOpen}>
          <UserList />
        </RouteWrapper>
      </Route>
      <Route
        exact
        path={`${match.path}/report-issue`}
      >
        <RouteWrapper section="Reportar nuevo Issue" open={open} handler={toggleOpen}>
          <ReportIssue />
        </RouteWrapper>
      </Route>
      <Route path={`${match.path}/issue-edit`}>
        <RouteWrapper section="Reportar nuevo Issue" open={open} handler={toggleOpen}>
          <EditIssue />
        </RouteWrapper>
      </Route>
    </Switch>
  );
}

function RouteWrapper({children, section, open, handler}) {
  return (
    <Sidebar handleClick={handler} open={open}>
      <Componentbar section={section} open={open} />
      {children}
    </Sidebar>
  );
}
