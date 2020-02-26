import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {issuesHandler} from '../handlers/issues';
import MaterialTable from 'material-table';
import {getIsoDate} from '../helpers/formatDate';
import {
  issueTypesMap,
  prioritiesMap,
  statusTypesMap,
} from '../helpers/issueOptions';

const issueCols = [
  {
    title: 'Titulo',
    field: 'title',
    render: rowData => (
      <Link to={`/user/issue?q=${rowData._id}`}>{rowData.title}</Link>
    ),
  },
  {title: 'Estado', field: 'status', lookup: statusTypesMap},
  {title: 'Tipo', field: 'type', lookup: issueTypesMap},
  {title: 'Responsable', field: 'assignee.username'},
  {title: 'Prioridad', field: 'priority', lookup: prioritiesMap},
  {
    title: 'Creado',
    field: 'createdAt',
    render: rowData => getIsoDate(rowData.createdAt),
  },
  {
    title: 'Actualizado',
    field: 'updatedAt',
    render: rowData => getIsoDate(rowData.updatedAt),
  },
];

export default function IssueList(props) {
  const emptyIssue = {
    title: '',
    type: '',
    priority: '',
    state: '',
    assignee: '',
    updatedAt: '',
    createdAt: '',
  };
  const [issues, setIssues] = useState([emptyIssue]);
  const [loading, setLoading] = useState(true);
  const {isAdmin} = props;

  const handleDelete = async issueRow => {
    try {
      await issuesHandler.deleteById(issueRow._id);
      const {issues} = await issuesHandler.getAll();
      setIssues(issues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (newData, oldData) => {
    try {
      const id = oldData._id;
      await issuesHandler.update(id, newData);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      issuesHandler
        .getAll()
        .then(data => {
          setLoading(false);
          setIssues(data.issues);
        })
        .catch(err => console.log('There is an error', err));
    }
  }, [loading]);
  console.log(issues);

  return (
    <MaterialTable
      title=""
      columns={issueCols}
      data={issues}
      editable={
        isAdmin
          ? {
              onRowUpdate: handleUpdate,
              onRowDelete: handleDelete,
            }
          : {}
      }
      localization={{
        header: {
          actions: 'Acciones',
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
        },
        body: {
          editRow: {
            deleteText: 'Seguro que quieres borrar esto?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Confirmar',
          },
        },
        toolbar: {
          searchTooltip: 'Buscar',
          searchPlaceholder: 'Buscar',
        },
      }}
    />
  );
}
