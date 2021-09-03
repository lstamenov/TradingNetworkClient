import React, { useState } from 'react';
import axios from 'axios';
import './AddPost.css';
import defaultPhoto from './no-image.png';
import { useHistory } from 'react-router-dom';

const AddPost = () => {
    const history = useHistory();

    let submitHandler = (e) => {
        e.preventDefault();
        let inputHtmlElements = document.getElementsByClassName('text-fields');
        let inputElements = [...inputHtmlElements];

        let itemName = inputElements[0].value;
        let itemPrice = inputElements[1].value;
        let picture = photo;
        console.log(photo);
        let itemDesc = document.getElementsByTagName('textarea')[0].innerText;
        let itemNumber = inputElements[4].value;
        let email = inputElements[2].value;
        let password = inputElements[3].value;
    
        let form = new FormData();
        form.append('itemName', itemName);
        form.append('itemDesc', itemDesc);
        form.append('itemPrice', itemPrice);
        form.append('picture', picture);
        form.append('itemNumber', itemNumber);
        form.append('email', email);
        form.append('password', password);
    
        axios.post('http://localhost:8080/add', form)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        history.push('/', {from: "Add-Item"});
    }

    
    const [photo, setPhoto] = useState(undefined);
    console.log(photo);

    const uploadPhotoHandler = () => {
        let inputFile = document.getElementById('upload-photo');
        inputFile.click();
    }

    const onChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setPhoto(URL.createObjectURL(e.target.files[0]));
        console.log(photo);
    }
    return (
        <div id="item-wrapper">
            <form id="add-form">
                    <img id="default-photo" src={photo == undefined ? defaultPhoto : photo}></img>
                    <button type="button" onClick={uploadPhotoHandler} id="upload-btn">Upload photo</button>
                    <input onChange={onChangeHandler} id="upload-photo" type="file" style={{display: 'none'}} name="file"/><br/>
                    <label className="text-labels" htmlFor="title">Title</label><br/>
                    <input name="title" className="text-fields" type="text"></input><br/>
                    <label htmlFor="price" className="text-labels">Price</label><br/>
                    <input type="number" className="text-fields" name="price"/><br/>
                    <label htmlFor="email" className="text-labels">Email</label><br/>
                    <input name="email" type="text" className="text-fields"/><br/>
                    <label htmlFor="password" className="text-labels">Password</label><br/>
                    <input name="password" className="text-fields" type="password"/><br/>
                    <label htmlFor="number" className="text-labels">Number</label><br/>
                    <input name="number" className="text-fields" type="text"/><br/>
                    <div id="desc-item">
                        <h2>Description</h2>
                        <textarea></textarea>
                    </div>
                    <input onClick={submitHandler} id="submit-item-btn" value="Create" type="submit"/>
            </form>
        </div>
    );
}

export default AddPost;