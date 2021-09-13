import axios from "axios"

const login = async (username, password) => {
    try{
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
            "username": username,
            "password": password
        });
    
        if(await response.data.accessToken){
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return true;
        
    }catch(e){
        console.log(e);
        return false;
    }
}

const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
}

const register = (firstName, lastName, email, username, password) => {
    axios.post('http://localhost:8080/api/auth/signup', {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "username": username,
        "password": password
    });
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

export default {login, register, logout, getCurrentUser};