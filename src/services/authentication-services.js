import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}

async function login(email, password){
    const params = {email, password}
    let res = await axios.post('http://localhost:5000/user/login', params );
    localStorage.setItem('currentUser', JSON.stringify(res.user));
    currentUserSubject.next(res.data)
    return res.data;
}

function logout (){
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}