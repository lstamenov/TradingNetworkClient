import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListItems.css';

const ListItems = () => {  
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/items/view/all')
        .then(res => setItems(res.data))
        .catch(err => console.log(err));
    }, [1]);

    // const fetchItems = async () => {
    //     try{
    //         const data = await axios.get('http://localhost:8080/api/items/view/all');
    //         const itemsArr = await data.data;
    //         setItems(itemsArr);
    //     }catch(err){
    //         console.log(err);
    //     }
        
    // }

    return (
        <div id="list-wrapper">
            <button className="crud-btns" id="add-item">{<Link to={localStorage.getItem('user') ? "/add-post" : "/login"}>Add item for sale</Link>}</button>
        
            {items.map(item => (
                <div className="single-item" key={item.id}>
                    <img className="pics" src={`data:image/jpeg;base64,${item.picture}`}></img>
                    <h1 className="titles">{item.name}</h1>
                    <h1 className="numbers">{item.price}$</h1>
                    <button className="item-details"><Link to={`items/${item.id}`}>Details</Link></button>
                </div>
            ))}
        </div>
    )
}

export default ListItems;