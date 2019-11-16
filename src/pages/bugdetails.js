import React , {useState, useEffect} from 'react';

import {bugHandler} from '../services/bug-handler';
import BugInfoCard from '../components/cards/bug-info-card';
import BugCommentCard from '../components/cards/bug-comment-card';
import BugAddComment from '../components/bug-add-comment';

export default function BugPage(props){
    const [ comp , setComp ] = useState(null);
    const [ commentsCards, setCommentsCards ] = useState(null);
    const id = props.location.search.split('=')[1];
    useEffect(() =>{
        if (!comp){

            bugHandler.getById(id)
            .then(res => { 
                setComp( <BugInfoCard info={res} /> );
                if (res.comments.length){
                    setCommentsCards( <BugCommentCard comments={res.comments} /> )
                }
            })
            .catch(err => console.log(err));
        }
    })
        
        return(
            <div>This is a bug number #{id} 
            {comp}
            {commentsCards}
            <BugAddComment />
            </div>
    )
}