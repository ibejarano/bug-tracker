import React, {useState, useEffect} from 'react';
import {issuesHandler} from '../../handlers/issues';

import IssueTable from './cards/table';
import Layout from '../layout/main-layout';

export default function IssueList(props) {
  const [issues, setIssues] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const deleteIssue = id => {
    issuesHandler
      .deleteById(id)
      .then(res => console.log(res))
      .catch(err => console.log('Error ocurred!', err))
      .finally(() => setIssues([]));
  };

  useEffect(() => {
    issuesHandler
      .getAll()
      .then(data => {
        setIssues(data.issues);
        setIsAdmin(data.user.role === 0 ? true : false);
      })
      .catch(err => console.log('There is an error', err));
  }, []);

  return (
    <Layout section="Lista de Issues">
      <IssueTable issues={issues} isAdmin={isAdmin} deleteIssue={deleteIssue} />
    </Layout>
  );
}
