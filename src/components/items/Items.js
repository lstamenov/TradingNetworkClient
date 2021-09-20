import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Items.css';
import { useLocation, Link } from 'react-router-dom';
import UserCard from '../user/UserCard';
import currUser from '../../services/auth.service';

function Items (){
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [owner, setOwner] = useState({});

    const location = useLocation();
    const pathArr = location.pathname.split('/');
    const id = pathArr[pathArr.length - 1];
    
    useEffect(() => {        
        axios.get(`http://localhost:8080/api/items/view/${id}`)
            .then(resp => {
                setOwner(resp.data.owner);
                setItem(resp.data);
            })
            .catch(err => console.log(err));

        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, []);
    
    let datePosted = String(item.datePosted).substring(0,10);
    
    return (
        <div id="item-wrapper">
            {!isLoading &&
            <div>
                <h1 id="title">{item.name}</h1>
                <h1 id="price"><span className="item-detail">price: </span>{item.price}$</h1>
                <h1 id="number"><span className="item-detail">phone: </span>{item.number}</h1>
                <h1 id="date-posted"><span className="item-detail">date posted: </span>{datePosted}</h1>
                <div id="desc">
                    <p>{item.description}</p>
                </div>
                <img id="pic" src={`data:image/jpeg;base64,${item.picture}`} />
                <UserCard username={item.owner.username}/>
                {currUser.getCurrentUser() && owner ? owner.username === currUser.getCurrentUser().username ? <button className="buy-btn"><Link to={`/items/edit/${item.id}`}>Edit</Link></button> : <button class="buy-btn"><Link to={{pathname: `/order/${item.id}`}}>Buy Now</Link></button>
 : <button className="buy-btn"><Link to={{pathname: `/order/${item.id}`}}>Buy Now</Link></button>}
            </div>
            }
            {isLoading &&
            <div>
                <h1 style={{color: 'transparent'}} id="title" className="skeleton">wallpaper</h1>
                <h1 style={{color: 'transparent'}} id="price" className="skeleton">price:111$<span className="item-detail"></span></h1>
                <h1 style={{color: 'transparent'}} id="number" className="skeleton">phone:0881235421<span className="item-detail"></span></h1>
                <h1 style={{color: 'transparent'}} id="date-posted" className="skeleton">date posted: 12142413<span className="item-detail"></span></h1>
                <div id="desc">
                    <p style={{color: 'transparent'}} className="skeleton"></p>
                    <p style={{color: 'transparent'}} className="skeleton"></p>
                </div>
                <img className="skeleton" id="pic"></img>
                <div className="user-card">
                    <img className="skeleton"></img>
                    <div className="user-details skeleton">
                        <h3 style={{color: 'transparent'}} className="skeleton">some name</h3>
                    </div>
                    <button className="view-user skeleton"></button>
                </div>
                <button class="buy-btn skeleton"><Link to={{pathname: `/order/${item.id}`}}></Link></button>
            </div>
            }    
        </div>
    )
}


export default Items;