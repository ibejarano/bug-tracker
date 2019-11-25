import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { issuesHandler } from "../../handlers/issues";
import BugInfoCard from "./cards/bug-info-card";
import BugCommentCard from "./cards/bug-comment-card";
import BugAddComment from "./add-comment";

export default function BugPage(props) {
  async function getIssueComments() {
    const res = await issuesHandler.getById(id);
    console.log("Received issue info", res);
    setIssue(res.issue);
    setIsAdmin(res.user.isAdmin);
    if (res.issue.comments.length) {
      setCommentsCards(
        <BugCommentCard
          comments={res.issue.comments}
          assignee={res.issue.assignee}
        />
      );
    }
  }

  const [issue, setIssue] = useState(null);
  const [commentsCards, setCommentsCards] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const id = props.location.search.split("=")[1]; //TODO ADD Error handling if query doesnt exist

  const addNewComment = async function(text) {
    const params = { text };
    try {
      await issuesHandler.addComment(id, params);
      getIssueComments();
    } catch (err) {
      console.log("An error ocurred adding comment:", err.toString());
    }
  };

  useEffect(() => {
    getIssueComments();
  }, []);

  return (
    <div>
      {issue && <BugInfoCard info={issue} />}
      {isAdmin && <Link to={`/user/issue-edit?id=${id}`}>Edit Issue</Link>}
      {commentsCards}
      <BugAddComment addNewComment={addNewComment} />
    </div>
  );
}
