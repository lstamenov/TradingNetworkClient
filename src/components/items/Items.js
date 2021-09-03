import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Items.css';
import { useLocation, Link } from 'react-router-dom';

function Items (){
    const [item, setItem] = useState({});
    const location = useLocation();
    const pathArr = location.pathname.split('/');
    const id = pathArr[pathArr.length - 1];
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/no-auth/items/${id}`)
        .then(resp => {
            setItem(resp.data);
        })
        .catch(err => console.log(err))

    }, []);

    let email = `mailto:${item.email}`;
    let datePosted = String(item.datePosted).substring(0,10);

    return (
        <div id="item-wrapper">
            <h1 id="title">{item.name}</h1>
            <h1 id="price">{item.price}$</h1>
            <h1 id="number">{item.number}</h1>
            <h1 id="date-posted">{datePosted}</h1>
            <div id="desc">
                <p>{item.description}</p>
            </div>
            <img id="pic" src={`data:image/jpeg;base64,${item.picture}`} />
            <button class="buy-btn"><Link to={{pathname: `/order/${item.id}`}}>Buy</Link></button>
            <button class="buy-btn"><a href={email}>Message</a></button>
        </div>
    )
}


export default Items;