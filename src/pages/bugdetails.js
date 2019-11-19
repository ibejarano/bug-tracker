import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { bugHandler } from '../services/bug-handler';
import BugInfoCard from '../components/cards/bug-info-card';
import BugCommentCard from '../components/cards/bug-comment-card';
import BugAddComment from '../components/bug-add-comment';

export default function BugPage(props) {
    const [comp, setComp] = useState(null);
    const [commentsCards, setCommentsCards] = useState(null);
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
            setComp(null)
            console.log(props.history)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!comp) {

            bugHandler.getById(id)
                .then(res => {
                    setComp(<BugInfoCard info={res} />);
                    if (res.comments.length) {
                        setCommentsCards(<BugCommentCard comments={res.comments} />)
                    }
                })
                .catch(err => console.log(err));
        }
    })

    return (
        <div>This is a bug number #{id}
            {comp}
            {commentsCards}
            <BugAddComment addNewComment={addNewComment} />
        </div>
    )
}