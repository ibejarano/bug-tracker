import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { issuesHandler } from '../handlers/issues';
import BugInfoCard from '../components/cards/bug-info-card';
import BugCommentCard from '../components/cards/bug-comment-card';
import BugAddComment from '../components/bug-add-comment';

export default function BugPage(props) {
    const [issue, setIssue] = useState(null);
    const [commentsCards, setCommentsCards] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const id = props.location.search.split('=')[1]; //TODO ADD Error handling if query doesnt exist

    const addNewComment = async function (text) {
        const params = { text }
        try {
            const res = await issuesHandler.addComment(id, params)
            setIssue(null)
            console.log(res)
            console.log(props.history)
        } catch (err) {
            console.log('An error ocurred adding comment:', err.toString())
        }
    }

    useEffect(() => {
        async function getIssueComments() {
            const res = await issuesHandler.getById(id);
            console.log('Received bug info',res)
            setIssue(res.issue);
            setIsAdmin(res.user.isAdmin)
            if (res.issue.comments.length) {
                setCommentsCards(<BugCommentCard comments={res.issue.comments} />);
            }
        }
        if (!issue) {
            try {
                getIssueComments();
            } catch (error) {
                console.log(error.toString());
            }
        }
    })

    return (
        <div>This is a bug number #{id}
            {issue && <BugInfoCard info={issue} /> }
            {isAdmin && <Link to={`/issue-edit?id=${id}`} >Edit Issue</Link> }
            {commentsCards}
            <BugAddComment addNewComment={addNewComment} />
        </div>
    )
}