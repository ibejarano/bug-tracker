import axios from 'axios';



export const bugHandler = {
    getById,
    update
}

async function getById(id){
    try{
        const res = await axios.get(`http://localhost:5000/bugs/${id}`,{
            headers: {
                Authorization: 'Bearer '+ JSON.parse(localStorage.currentUser)
            }
        } );
        return res.data
    } catch(err){
        console.log('Bug id not found!' , err)
        return err
    }
}

async function update(id){
    throw new Error('Updating bug not implemented yet!')
}