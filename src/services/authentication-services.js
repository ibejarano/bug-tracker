import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

console.log('Line 5 Local Storage',localStorage)
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}

async function login(email, password){
    const params = {email, password}
    let res = await axios.post('http://localhost:5000/user/login', params ).catch(err => console.log('Some error!', err));
    console.log('Raw response from server', res)
    localStorage.setItem('currentUser', JSON.stringify(res.data.token));
    currentUserSubject.next(res.data.user)
    return res.data.user
}

function logout(){
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}