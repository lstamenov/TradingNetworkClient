import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListItems.css';

const ListItems = () => {  
    const [items, setItems] = useState(null);

    useEffect(() => {
        setTimeout( () => {
        axios.get('http://localhost:8080/api/items/view/all')
        .then(res => {
            setItems(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
        console.log(items);
        }, 2000);
    }, [1]);

    return (
        <div onLoad={() => console.log(items)} id="list-wrapper">
            {/* <button className="crud-btns" id="add-item">{<Link to={localStorage.getItem('user') ? "/add-post" : "/login"}>Add item for sale</Link>}</button> */}
            <div className="vertical-list">
                {items && items.map(item => (
                    <div className="single-item" key={item.id}>
                        <img  className="pics skeleton" src={`data:image/jpeg;base64,${item.picture}`}></img>
                        <h1 className="titles">{item.name}</h1>
                        <h1 className="numbers">{item.price}$</h1>
                        <button className="item-details"><Link to={`items/${item.id}`}>Details</Link></button>
                    </div>
                ))}
                {!items && 
                <div>
                    <div className="single-item" key={1}>
                        <img className="pics skeleton"></img>
                        <h1 className="titles skeleton"></h1>
                        <h1 className="numbers skeleton"></h1>
                        <button className="item-details skeleton"></button>
                    </div>
                    <div className="single-item" key={2}>
                        <img  className="pics skeleton"></img>
                        <h1 className="titles skeleton"></h1>
                        <h1 className="numbers skeleton"></h1>
                        <button className="item-details skeleton"></button>
                    </div>
                    <div className="single-item" key={3}>
                        <img  className="pics skeleton"></img>
                        <h1 className="titles skeleton"></h1>
                        <h1 className="numbers skeleton"></h1>
                        <button className="item-details skeleton"></button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default ListItems;