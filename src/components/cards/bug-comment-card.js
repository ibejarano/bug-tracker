import React from 'react';

export default function BugCommentCard( { comments } ){
    const commentsComponent = comments.map((val,idx) => {
        return(
            <div key={idx}>
                <h1> Comment # {idx +1}</h1>
                <h3>Author: {val.author} </h3>
                <p> date: {val.date} </p>
                <p> {val.text}  </p>
            </div>
        )
    })
    return(
        <ul>
            {commentsComponent}
        </ul>
    )
}