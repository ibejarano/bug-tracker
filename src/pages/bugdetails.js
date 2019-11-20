import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { bugHandler } from '../services/bug-handler';
import BugInfoCard from '../components/cards/bug-info-card';
import BugCommentCard from '../components/cards/bug-comment-card';
import BugAddComment from '../components/bug-add-comment';

export default function BugPage(props) {
    const [bug, setBug] = useState(null);
    const [commentsCards, setCommentsCards] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const id = props.location.search.split('=')[1]; //TODO ADD Error handling if query doesnt exist

    const addNewComment = async function (text) {
        const params = { text: text }
        try {
            const urlComments = `http://localhost:5000/bugs/add-comment/${id}`
            const res = await axios.put(urlComments
                , params, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.currentUser)
                }
            })
            console.log(res)
            setBug(null)
            console.log(props.history)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function getBugComments() {
            const res = await bugHandler.getById(id);
            console.log('Received bug info',res)
            await setBug(res.bug);
            await setIsAdmin(res.user.isAdmin)
            if (res.bug.comments.length) {
                setCommentsCards(<BugCommentCard comments={res.bug.comments} />);
            }
        }
        if (!bug) {
            try {
                getBugComments();
            } catch (error) {
                console.log(error.toString());
            }
        }
    })

    return (
        <div>This is a bug number #{id}
            {bug && <BugInfoCard info={bug} /> }
            {isAdmin && <Link to={`/issue-edit?id=${bug._id}`} >Edit Issue</Link> }
            {commentsCards}
            <BugAddComment addNewComment={addNewComment} />
        </div>
    )
}