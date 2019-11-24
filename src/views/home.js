import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../components/layout/main-layout";

import IssueList from "../components/issue/list";
import IssueDetails from "../components/issue/details";
import ReportIssue from "../components/issue/add";
import EditIssue from "../components/issue/edit";
import UserList from "../components/admin/user-list";

export default function Dashboard({ match }) {
  const HomeDashboard = () => {
    return (
      <div>
        <h1>Home sweet home!</h1>
      </div>
    );
  };
  return (
    <Layout matchUrl={match.path}>
      <Switch>
        <Route exact path={`${match.path}`} component={HomeDashboard} />
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
    </Layout>
  );
}
