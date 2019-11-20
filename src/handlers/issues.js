import axios from 'axios';
import { authenticationService } from '../services/authentication-services';

const authHeader  = {
    headers: {
        Authorization: 'Bearer ' + authenticationService.currentUserValue
    }
}

export const issuesHandler = {
    getAll,
    getById,
    add,
    update,
    deleteById,
    addComment
}

async function getAll(){
    try {
        const res = await axios.get('http://localhost:5000/bugs', authHeader);
        console.log('All the data is here:',res.data)
        return res.data
    } catch (err) {
        console.log('Error getting issues', err)
        return err
    }
}

async function getById(id) {
    try {
        const res = await axios.get(`http://localhost:5000/bugs/${id}`, authHeader);
        return res.data
    } catch (err) {
        console.log('Issue id not found!', err)
        return err
    }
}

async function add(params){
    try {
        const res = await axios.post('http://localhost:5000/bugs',params, authHeader);
        console.log('new Issue registered!')
        return res
    } catch (err) {
        console.log('Error adding new issue', err)
        return err
    }
}

async function update(id, params) {
    console.log('Updating bug #', id)
    const urlPost = `http://localhost:5000/bugs/${id}`;
    try {
        const res = await axios.put(urlPost, params, authHeader)
        // TODO use this to display some info!
        return res
    } catch (error) {
        console.log(error.toString())
        return error
    }
};

async function deleteById(id){
    try {
        const res = await axios.delete(`http://localhost:5000/bugs/${id}`, authHeader);
        return res
    } catch (err) {
        console.log('Bug id not found!', err)
        return err
    }
}


async function addComment(id, params) {
    const urlComments = `http://localhost:5000/bugs/add-comment/${id}`
    const res = await axios.put(urlComments , params, authHeader)
    return res
}