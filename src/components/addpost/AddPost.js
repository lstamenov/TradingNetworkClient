import React, { useState } from 'react';
import axios from 'axios';
import './AddPost.css';
import defaultPhoto from './no-image.png';
import { useHistory } from 'react-router-dom';
import header from '../../services/auth-header';

const AddPost = () => {
    const history = useHistory();

    let submitHandler = (e) => {
        e.preventDefault();
        let inputHtmlElements = document.getElementsByClassName('text-fields');
        let inputElements = [...inputHtmlElements];

        let itemName = inputElements[0].value;
        let itemPrice = inputElements[1].value;
        let itemDesc = document.getElementById('desc-text').value;
        console.log(itemDesc);
        let itemNumber = inputElements[4].value;

        let form = new FormData();

        form.append('title', itemName);
        form.append('description', itemDesc);
        form.append('price', itemPrice);
        form.append('phoneNumber', itemNumber);
        console.log(photo);
        form.append('picture', photo);
        form.append('ownerId', JSON.parse(localStorage.getItem('user')).id);
    
        // 'title': itemName,
        // 'description': itemDesc,
        // 'price': itemPrice,
        // 'phoneNumber': itemNumber,
        // 'picture': photo,
        // 'ownerId': JSON.parse(localStorage.getItem('user')).id

        axios.post('http://localhost:8080/api/items/add', form, {headers: header.authHeader()})
        .then(res => console.log(res))  
        .catch(err => console.log(err));

        history.push('/', {from: "Add-Item"});
    }

    
    const [photo, setPhoto] = useState(undefined);

    const uploadPhotoHandler = () => {
        let inputFile = document.getElementById('upload-photo');
        inputFile.click();
    }

    const onChangeHandler = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <div id="item-wrapper">
            <form id="add-form">
                    <img id="default-photo" src={photo == undefined ? defaultPhoto : URL.createObjectURL(photo)}></img>
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
                    <input onClick={submitHandler} id="add-item-btn" value="Create" type="submit"/>
                    <div id="desc-item">
                        <h2>Description</h2>
                        <textarea id="desc-text"></textarea>
                    </div>
            </form>
        </div>
    );
}

export default AddPost;