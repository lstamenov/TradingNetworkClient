import axios from "axios"

const login = (username, password) => {
    axios.post('http://localhost:8080/api/no-auth/signin', {
        "username": username,
        "password": password
    }).then(res => {
        if(res.data.accessToken){
            localStorage.setItem('user', JSON.stringify(res.data));
        }
    }).catch(err => console.log(err));
}

export default {login};