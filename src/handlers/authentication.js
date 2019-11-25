import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const currentUserIsAdmin = new BehaviorSubject(JSON.parse(localStorage.getItem('isAdmin')));

export const authenticationService = {
    login,
    currentUser: currentUserSubject.asObservable(),
    removeSession,
    get currentUserValue() { return currentUserSubject.value },
    get isAdmin() {return currentUserIsAdmin.value }
}

async function login(email, password) {
    const params = { email, password }
    let res = await axios.post('http://localhost:5000/login', params).catch(err => console.log('Some error!', err));
    localStorage.setItem('currentUser', JSON.stringify(res.data.token));
    localStorage.setItem('isAdmin', JSON.stringify(res.data.userAuth.isAdmin));
    currentUserSubject.next(res.data.userAuth)
    return res.data.userAuth
}

function removeSession(){
    localStorage.clear();	
    currentUserSubject.next(null);
}