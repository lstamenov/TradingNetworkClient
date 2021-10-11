import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import header from '../../services/auth-header';
import defaultPhoto from '../addpost/no-image.png';
import HashLoader from 'react-spinners/HashLoader';
import { useEffect } from 'react/cjs/react.development';


const EditItem = () => {
    const history = useHistory();
    const itemId = history.location.pathname.substring(12);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
            axios.get(`http://localhost:8080/api/items/view/${itemId}`)
            .then(res => setItem(res.data))
            .catch(err => console.log(err));
    }, []);

    let submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let inputHtmlElements = document.getElementsByClassName('text-fields');
        let inputElements = [...inputHtmlElements];

        let title = inputElements[0].value;
        let price = inputElements[1].value;
        let description = document.getElementById('desc-text').value;
        let number = inputElements[2].value;

        const req = new FormData();
        req.append("title", title);
        req.append("price", price);
        req.append("description", description);
        req.append("number", number);
        if(photo){
            req.append("picture", photo);
        }

        setTimeout(() => {
            axios.put(`http://localhost:8080/api/items/edit/${itemId}`, req , {headers: header.authHeader()})
            .then(res =>{ 
                console.log(res);
                history.push('/', {from: "Add-Item"});
            })  
            .catch(err => {
                console.log(err)
            });
            setIsLoading(false);
        }, 2000);
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            axios.delete(`http://localhost:8080/api/items/edit/delete/${itemId}`, {headers: header.authHeader()})
            .then(res =>{ 
                console.log(res);
                history.push('/', {from: "Add-Item"});
            })  
            .catch(err => {
                console.log(err)
            });
            setIsLoading(false);
        }, 2000);        
    }

    
    const [photo, setPhoto] = useState();

    const uploadPhotoHandler = () => {
        let inputFile = document.getElementById('upload-photo');
        inputFile.click();
    }

    const onChangeHandler = (e) => {
        setPhoto(e.target.files[0]);
    }

    return(
        <div id="item-wrapper-edit">
            <form id="add-form">
                    <img id="default-photo" src={!photo ? item.picture ? `data:image/jpeg;base64,${item.picture}` : defaultPhoto : URL.createObjectURL(photo)}></img>
                    <button type="button" onClick={uploadPhotoHandler} id="upload-btn">Change photo</button>
                    <input onChange={onChangeHandler} id="upload-photo" type="file" style={{display: 'none'}} name="file"/><br/>
                    <label className="text-labels" htmlFor="title">Title</label><br/>
                    <input name="title" className="text-fields" type="text" defaultValue={item.name}/><br/>
                    <label htmlFor="price" className="text-labels">Price</label><br/>
                    <input type="number" className="text-fields" name="price" defaultValue={item.price}/><br/>
                    <label htmlFor="number" className="text-labels">Number</label><br/>
                    <input name="number" className="text-fields" type="text" defaultValue={item.number}/><br/>
                    <input onClick={submitHandler} id="add-item-btn" value="Update" type="submit"/>
                    <input onClick={deleteHandler} id="delete-item-btn" value="Delete" type="submit"/>
                    <div id="desc-item">
                        <h2>Description</h2>
                        <textarea id="desc-text" defaultValue={item.description}></textarea>
                    </div>
                    {isLoading && <div className="loading-animation"><HashLoader color={"white"} size={250}/></div>}
            </form>
        </div>
    )
}

export default EditItem;