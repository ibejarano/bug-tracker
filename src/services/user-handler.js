import axios from 'axios';


export const userHandler = {
    getAllUsers
}

async function getAllUsers() {
    try {
        const res = await axios.get('http://localhost:5000/user/', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.currentUser)
            }
        });
        return res.data
    } catch (err) {
        console.log('Users not found!', err)
        return err
    }
}