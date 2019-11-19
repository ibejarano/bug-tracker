import React, { useState } from 'react';


export default function BugAddComment(props) {
    const [text, setText] = useState('');

    const changeTextHandler = (e) => setText(e.target.value)
    const submitHandler = (e) => {
        e.preventDefault();
        props.addNewComment(text);
    }

    return (
        <form onSubmit={submitHandler} >
            <input type="textarea" value={text} onChange={changeTextHandler} />
            <button type='submit' >Post Comment</button>
        </form>
    )
}