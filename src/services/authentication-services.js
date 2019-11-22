import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


export const authenticationService = {
    login,
    currentUser: currentUserSubject.asObservable(),
    removeSession,
    get currentUserValue() { return currentUserSubject.value }
}

async function login(email, password) {
    const params = { email, password }
    let res = await axios.post('http://localhost:5000/login', params).catch(err => console.log('Some error!', err));
    localStorage.setItem('currentUser', JSON.stringify(res.data.token));
    currentUserSubject.next(res.data.userAuth)
    return res.data.userAuth
}

function removeSession(){
    localStorage.removeItem('currentUser');	
    currentUserSubject.next(null);
}