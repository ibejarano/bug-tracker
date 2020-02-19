import React, {useState, useEffect} from 'react';
import {issuesHandler} from '../../handlers/issues';

import IssueTable from './cards/table';
import Layout from '../layout/main-layout';

export default function IssueList(props) {
  const [issues, setIssues] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const deleteIssue = async id => {
    try {
      const deleteResponse = await issuesHandler.deleteById(id);
      const { issues } = await issuesHandler.getAll();
      setIssues(issues);
      console.log(deleteResponse);
    } catch (err) {
      console.log(err);
    }
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
    <Layout section="Lista de Issues" isAdmin={isAdmin}>
      <IssueTable issues={issues} isAdmin={isAdmin} deleteIssue={deleteIssue} />
    </Layout>
  );
}
