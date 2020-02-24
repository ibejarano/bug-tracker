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

  return (
      <Switch>
        <Route exact path={`${match.path}`} >
          <RouteWrapper section="Inicio">
            <Dashboard />
          </RouteWrapper>
        </Route>
        <Route path={`${match.path}/issue`} component={IssueDetails}>
          <RouteWrapper section="Issue Details">
            <IssueDetails />
          </RouteWrapper>
        </Route>
        <Route exact path={`${match.path}/issue-log`} component={IssueLog}>
          <RouteWrapper section="Lista de Issues">
            <IssueLog />
          </RouteWrapper>
        </Route>
        <Route exact path={`${match.path}/list`} component={UserList}>
          <RouteWrapper section="Lista de usuarios">
            <UserList />
          </RouteWrapper>
        </Route>
        <Route
          exact
          path={`${match.path}/report-issue`}
          component={ReportIssue}
        />
        <Route path={`${match.path}/issue-edit`} component={EditIssue} />
      </Switch>
  );
}


function RouteWrapper({children, section}){
  console.log('wrapper', section)
  return (
  <Sidebar>
    <Componentbar section={section} />
    {children}
  </Sidebar>
  )
}
