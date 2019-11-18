import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


export const authenticationService = {
    login,
    logout,
    getUserInfo,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}

async function login(email, password){
    const params = {email, password}
    let res = await axios.post('http://localhost:5000/user/login', params ).catch(err => console.log('Some error!', err));
    localStorage.setItem('currentUser', JSON.stringify(res.data.token));
    currentUserSubject.next(res.data.user)
    return res.data.user
}

async function logout(id){
    const params = {id};
    const res = await axios.post('http://localhost:5000/user/logout', params ).catch(err => console.log('Some error!', err))
    console.log(res)
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

async function getUserInfo(){
    try{
        let res = await axios.get('http://localhost:5000/user/info', {
            headers: {
                Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('currentUser'))
            }
        })
        return res.data
    } catch(error){
        console.log('Error ocurred get user info.', error.toString())
        return error
    }
}