import axios from 'axios';
import React, { useEffect, useState } from 'react';
import searchIcon from './loupe.png';
import { Link } from 'react-router-dom';
import './ListItems.css';

const ListItems = () => {  
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState();
    const [searchValue, setSearchValue] = useState();

    const searchHandler = () => {
        setFilteredItems(items.filter(itm => String(itm.title).includes(searchValue)));
    }

    useEffect(() => {
        setTimeout( () => {
        axios.get('http://localhost:8080/api/items/view/all')
        .then(res => {
            setItems(res.data);
            setFilteredItems(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
        console.log(items);
        }, 2000);
    }, [1]);

    return (
        <div id="list-wrapper">
            {/* <button className="crud-btns" id="add-item">{<Link to={localStorage.getItem('user') ? "/add-post" : "/login"}>Add item for sale</Link>}</button> */}
            <div className="search-bar">
                <img onClick={searchHandler} src={searchIcon}></img>
                <input onChange={(e) => {
                    setSearchValue(e.target.value);
                    if(e.target.value === ''){
                        setFilteredItems(items);
                    }
                }} id="search-input" type="text"/>
            </div>
            <div className="vertical-list">
                {filteredItems && filteredItems.map(item => (
                    <div className="single-item" key={item.id}>
                        <img  className="pics skeleton" src={`data:image/jpeg;base64,${item.picture}`}></img>
                        <h1 className="titles">{item.name}</h1>
                        <h1 className="numbers">{item.price}$</h1>
                        <button className="item-details"><Link to={`items/${item.id}`}>Details</Link></button>
                    </div>
                ))}
                {!filteredItems && 
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