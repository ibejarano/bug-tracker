import React from 'react';

import BugList from '../components/bug-list';

export default function BugListPage(props){
    return(
        <div>
            <BugList authUser= {props.authUser} />
        </div>
    )
}