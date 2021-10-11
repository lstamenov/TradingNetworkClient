import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListItems.css';
import searchIcon from './loupe.png';

const ListItems = () => {  
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState();
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filterHandler = (e) => {
        e.preventDefault();

        let currItems = [];

        if(category != 'all'){
            setFilteredItems(category.items);
            currItems = category.items;
        }else{
            currItems = items;
            setFilteredItems(items);
        }
        let findValue = document.getElementById('search-input').value;
        let priceFrom = document.getElementById('from-price').value;
        let priceTo = document.getElementById('to-price').value;

        if(Number(priceTo) && Number(priceFrom)){
            setFilteredItems(currItems.filter(item => item.name.includes(findValue) && Number(priceFrom) <= item.price && item.price <= Number(priceTo)));
        }else{
            if(currItems){
                setFilteredItems(currItems.filter(item => item.name.includes(findValue)));
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/items/view/all')
        .then(res => {
            setItems(res.data);
            setFilteredItems(res.data);
        }).catch(err => console.log(err));

        axios.get('http://localhost:8080/api/categories/view/all')
        .then((result) => {
            setCategories(result.data);
        }).catch((err) => {
            console.log(err);
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [1]);


    const categoryOnChangeHandler = (e) => {
        const categoryName = e.target.options[e.target.selectedIndex].text;
        if(categoryName !== 'all'){
            axios.get(`http://localhost:8080/api/categories/view/category/${categoryName}`)
            .then(res => setCategory(res.data))
            .catch(err => console.log(err));
        }else{
            setCategory('all');
        }
    }

    return (
    <div>
        <div className="sidebar-nav">
            <div className="filters">
                <div className="search-bar">
                    <h2>Search</h2>
                    <img src={searchIcon}></img>
                    <input type="text" id="search-input" placeholder="search for items" type="text"/>
                    <div className = "category-wrapper">
                        <h2>Category</h2>
                        <select onChange={categoryOnChangeHandler} className="category-option">
                            <option value="all">all</option>
                            {
                                categories && categories.map(cat => {
                                    return <option value={cat.id}>{cat.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="price-range">
                    <h2>Price</h2>
                    <input type="number" id="from-price" placeholder="from"/>
                    <input type="number" id="to-price" placeholder="to"/>
                </div>
                <button onClick={filterHandler} id="search-button">Search</button>
            </div>
        </div>
        <div id="list-wrapper">
            <button className="add-item-for-sale"><Link to="add-post">Add Item for sale</Link></button>
            <div className="items-list">
                {
                    items ?
                    isLoading ?
                    items && items.map(item => {
                        return <div className="item">
                                 <Link to={`/items/${item.id}`}>
                                    <img  className="item-img skeleton"></img>
                                    <h2 style={{'color': 'transparent'}} className="item-title skeleton">{item.name}</h2>
                                    <h3 style={{'color': 'transparent'}} className="item-date-price skeleton"><span>posted on:</span> {String(item.datePosted).substring(0, 10)}</h3>
                                    <h3 style={{'color': 'transparent'}} className="item-date-price skeleton"><span>price:</span> {item.price}$</h3>
                                 </Link>
                            </div>
                    })
                    :  
                    filteredItems && filteredItems.map(item => {
                        return <div className="item">
                                 <Link to={`/items/${item.id}`}>
                                    <img className="item-img" src={`data:image/jpeg;base64,${item.picture}`}></img>
                                    <h2 className="item-title">{item.name}</h2>
                                    <h3 className="item-date-price"><span>posted on:</span> {String(item.datePosted).substring(0, 10)}</h3>
                                    <h3 className="item-date-price"><span>price:</span> {item.price}$</h3>
                                 </Link>
                            </div>
                    }) 
                    :
                    <></>
                }
            </div>
        </div>
    </div>
    )
}

export default ListItems;