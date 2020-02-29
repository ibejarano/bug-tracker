import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {issuesHandler} from '../handlers/issues';
import MaterialTable from 'material-table';
import {getIsoDate} from '../helpers/formatDate';

const issueCols = [
  {
    title: 'Titulo',
    field: 'title',
    render: rowData => (
      <Link to={`/user/issue?q=${rowData._id}`}>{rowData.title}</Link>
    ),
  },
  {title: 'Estado', field: 'status'},
  {title: 'Tipo', field: 'type'},
  {title: 'Responsable', field: 'assignee.username'},
  {title: 'Prioridad', field: 'priority'},
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
      const data = await issuesHandler.getArchived();
      setIssues(data.issues);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      try {
        async function fetchData() {
          const data = await issuesHandler.getArchived();
          setIssues(data.issues)
          setLoading(false)
        }
        fetchData()
      }
      catch (err){
        console.log(err)
      }
    }
  }, [loading, isAdmin]);

  return (
    <MaterialTable
      title=""
      columns={issueCols}
      data={issues}
      editable={
        isAdmin
          ? {
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
