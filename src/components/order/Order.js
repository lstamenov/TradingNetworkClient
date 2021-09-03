import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { useHistory } from 'react-router-dom';

function Order() {
    const location = useLocation();
    const itemId = location.pathname.substring(7);
    const history = useHistory();

    const [item, setItem] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/no-auth/items/${itemId}`)
        .then(resp => {
            setItem(resp.data);
        })
        .catch(err => console.log(err))

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData();
        form.append("customerEmail", document.getElementById('email').value);
        form.append("customerFirstName", document.getElementById('fname').value);
        form.append("customerLastName", document.getElementById('lname').value);
        form.append("address", document.getElementById('address').value);
        form.append("itemId", itemId);

        axios.post(`http://localhost:8080/api/no-auth/order`, form)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        history.push('/successful-order', {from: "Order"});
    }

    return (
        <div id="order-wrapper">
            <form id="order-form">
                <label for="fname">First Name</label>
                <input autocomplete="off" type="text" id="fname" name="firstname" placeholder="Your name.."/>
                <label for="lname">Last Name</label>
                <input autocomplete="off" type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                <label for="lname">Email</label>
                <input autocomplete="off" type="text" id="email" name="email" placeholder="Your email.."/>
                <label for="lname">Addres</label>
                <input autocomplete="off" type="text" id="address" name="lastname" placeholder="Your address.."/>
                <input type="submit" id="submit-btn" onClick={handleSubmit} value="Submit"/>
            </form>
            <div id="item-details">
                <h1>Product Details</h1>
                <h2>title: {item.name}</h2>
                <h2>price: {item.price}$</h2>
            </div>
        </div>
    )
}

export default Order;