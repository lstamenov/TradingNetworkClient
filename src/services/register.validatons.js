const validatePassword = (password, confPassword) => {
    let errors = '';
    if(password !== confPassword){
        errors += "Password doesn't match!";
    }
    errors += validateBaseFields(password);
    
    return errors;
}

const validateBaseFields = (field) => {
    if(field === ''){
        return 'Field is required';
    }
    return '';
}

const validateEmail = (email) => {
    let emailReggex = new RegExp('^[^]+@[a-z]+.[a-z]+$');
    if(!emailReggex.test(email)){
        return 'Email is not valid';
    }
    return '';
}

export default {validatePassword, validateBaseFields, validateEmail};