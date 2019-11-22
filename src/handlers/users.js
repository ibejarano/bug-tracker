import axios from 'axios';
import { authenticationService } from '../services/authentication-services';


const authHeader  = {
    headers: {
        Authorization: 'Bearer ' + authenticationService.currentUserValue
    }
}

export const userHandler = {
    getUserInfo,
    getAllUsers,
    deleteById,
    logout
}

async function getUserInfo() {
    try {
        console.log(authHeader)
        let res = await axios.get('http://localhost:5000/user/info', authHeader)
        return res.data
    } catch (error) {
        console.log('Error ocurred get user info.', error.toString())
        return error
    }
}

async function getAllUsers() {
    try {
        const res = await axios.get('http://localhost:5000/user/', authHeader);
        return res.data
    } catch (err) {
        console.log('Users not found!', err)
        return err
    }
}

async function deleteById(id) {
    try {
        const res = await axios.delete(`http://localhost:5000/user/${id}`, authHeader);
        return res
    } catch (err) {
        console.log('User not found!', err)
        return err
    }
}

async function logout() {
    try {
        const params = {token: ''}
        const res = await axios.put('http://localhost:5000/user/logout/', params, authHeader);
        if(res.status === 200){
            authenticationService.removeSession();
        }
        else {
            throw new Error('Error during logout!')
        }
    } catch (err) {
        console.log('User not found!', err)
        return err
    }
}