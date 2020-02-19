import axios from 'axios';

export const issuesHandler = {
    getAll,
    getById,
    add,
    update,
    deleteById,
    addComment
}

const options = {
  withCredentials: true
}

async function getAll(){
    try {
        const res = await axios.get('http://localhost:5000/bugs', options);
        console.log('All the data is here:',res.data)
        return res.data
    } catch (err) {
        window.location ='/'
        return err
    }
}

async function getById(id) {
    try {
        const res = await axios.get(`http://localhost:5000/bugs/${id}`, options);
        return res.data
    } catch (err) {
        console.log('Issue id not found!', err)
        return err
    }
}

async function add(params){
    try {
        const res = await axios.post('http://localhost:5000/bugs',params, options);
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
        const res = await axios.put(urlPost, params, options)
        // TODO use this to display some info!
        return res
    } catch (error) {
        console.log(error.toString())
        return error
    }
};

async function deleteById(id){
    try {
        const {data} = await axios.delete(`http://localhost:5000/bugs/${id}`, options);
        return data
    } catch (err) {
        console.log('Bug id not found!', err)
        return err
    }
}


async function addComment(id, params) {
    const urlComments = `http://localhost:5000/bugs/add-comment/${id}`
    const res = await axios.put(urlComments , params, options)
    return res
}
