import React from "react";
import { Route, Switch } from "react-router-dom";

import IssueList from "../components/issue/list";
import IssueDetails from "../components/issue/details";
import ReportIssue from "../components/issue/add";
import EditIssue from "../components/issue/edit";
import UserList from "../components/admin/user-table";
import Dashboard from '../components/user/dashboard';

export default function Home(props) {
  const {match} = props

  return (
      <Switch>
        <Route exact path={`${match.path}`} component={Dashboard} />
        <Route path={`${match.path}/issue`} component={IssueDetails} />
        <Route exact path={`${match.path}/issue-log`} component={IssueList} />
        <Route exact path={`${match.path}/list`} component={UserList} />
        <Route
          exact
          path={`${match.path}/report-issue`}
          component={ReportIssue}
        />
        <Route path={`${match.path}/issue-edit`} component={EditIssue} />
      </Switch>
  );
}
