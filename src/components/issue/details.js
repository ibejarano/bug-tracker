import React, {useState, useEffect} from 'react';

import {issuesHandler} from '../../handlers/issues';
import IssueInfoCard from './cards/bug-info-card';
import IssueCommentCard from './cards/bug-comment-card';
import IssueAddComment from './add-comment';
import Layout from '../layout/main-layout';

export default function BugPage(props) {
  async function getIssueComments() {
    const res = await issuesHandler.getById(id);
    console.log('Received issue info', res);
    setIssue(res.issue);
    setIsAdmin(res.user.role === 0 ? true : false);
    if (res.issue.comments.length) {
      setCommentsCards(
        <IssueCommentCard
          comments={res.issue.comments}
          assignee={res.issue.assignee.username}
        />,
      );
    }
  }

  const [issue, setIssue] = useState(null);
  const [commentsCards, setCommentsCards] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const id = props.location.search.split('=')[1]; //TODO ADD Error handling if query doesnt exist

  const addNewComment = async function(text) {
    const params = {text};
    try {
      await issuesHandler.addComment(id, params);
      getIssueComments();
    } catch (err) {
      console.log('An error ocurred adding comment:', err.toString());
    }
  };

  useEffect(() => {
    getIssueComments();
  }, []);

  return (
    <Layout
      section={
        issue ? (
          <IssueInfoCard
            info={issue}
            editIssueUrl={isAdmin ? `/user/issue-edit?id=${id}` : null}
          />
        ) : (
          'Cargando...'
        )
      }>
      {commentsCards}
      <IssueAddComment addNewComment={addNewComment} />
    </Layout>
  );
}
