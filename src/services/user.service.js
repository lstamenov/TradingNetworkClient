import axios from 'axios';

const getUserByUsername = async (username) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/user/view/${username}`)
        console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export default {getUserByUsername}