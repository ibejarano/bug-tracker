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
  const config = {
    headers: {
      'Content-Type' : 'application/json',
    },
    withCredentials: true
  }
    const params = { email, password }
  console.log('sending for response')
    const res = await axios.post('http://localhost:5000/login', params, config).catch(err => console.log('Some error!', err));
  return res.data.userAuth
}

function removeSession(){
    localStorage.clear();	
    currentUserSubject.next(null);
}
