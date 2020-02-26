import React, {useState, useEffect} from 'react';
import {issuesHandler} from '../handlers/issues';
import MaterialTable from 'material-table';

import IssueTable from './issue/cards/table';

const issueCols = [
  {
    title: 'Titulo',
    field: 'title',
  },
  {title: 'Estado', field: 'status'},
  {title: 'Tipo', field: 'type'},
  {title: 'Responsable', field: 'assignee.username'},
  {title: 'Prioridad', field: 'priority'},
  {title: 'Creado', field: 'createdAt'},
  {title: 'Actualizado', field: 'updatedAt'},
];

export default function IssueList(props) {
  const emptyIssue= {title:'bueno bueno', type: '', priority:'',state:'',assignee:'',updatedAt:'',createdAt:''}
  const [issues, setIssues] = useState([emptyIssue]);
  const [loading, setLoading] = useState(true);
  const {isAdmin} = props;

  const deleteIssue = async id => {
    try {
      await issuesHandler.deleteById(id);
      const {issues} = await issuesHandler.getAll();
      setIssues(issues);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading){
    issuesHandler
      .getAll()
      .then(data => {
        setLoading(false)
        setIssues(data.issues);
      })
      .catch(err => console.log('There is an error', err));
    }
  }, [loading]);
  console.log(issues)

  return (
    <div>
       <IssueTable issues={issues} isAdmin={isAdmin} deleteIssue={deleteIssue} />
      <MaterialTable
        title=""
        columns={issueCols}
    data={issues}
      />
        </div>
  );
}
