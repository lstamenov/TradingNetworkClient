import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import defaultPhoto from './user.png';
import './UserProfile.css';
import currentUser from '../../services/auth.service';
import header from '../../services/auth-header';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const username = location.pathname.substring(6);

    const picUploadClickHandler = () => {
        const uploader = document.getElementById('pic-uploader');
        uploader.click();
    }

    const picUploadChangeHandler = (e) => {
        const profilePic = e.target.files[0];
        let fd = new FormData();
        fd.append('picture', profilePic);
        fd.append('userId', user.id);
        axios.post('http://localhost:8080/api/user/change/profile-picture', fd, {headers: header.authHeader()})
        .then(res => {
            fetch();
        })
        .catch(err => console.log(err));
    }

    const fetch = async () => {
        const res = await axios.get(`http://localhost:8080/api/user/view/${username}`);
        const data = await res.data;
        setUser(data);
        setItems(data.itemsPosted);
    };

    useEffect(() => {
        fetch();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);

    return(
        
        <div className="user-profile-page">
            {!isLoading &&
            <div>
                {user.profilePicture ? <img id="profile-picture" src={`data:image/jpeg;base64,${user.profilePicture}`}></img> : <img src={defaultPhoto}></img>}
                {currentUser.getCurrentUser() ? currentUser.getCurrentUser().username === username ? <button onClick={picUploadClickHandler} id="change-pic">change photo</button> : <></> : <></>}
                <input onChange={picUploadChangeHandler} id="pic-uploader" type="file" style={{'display': 'none'}}/>
                <h2 className="detail"><span>name: </span>{user.firstName} {user.lastName}</h2>
                <h2 className="detail"><span>username: </span>{username}</h2>
                <div className="users-posts">
                {
                    <div className="user-items">
                    {
                        items ? items.map(item => {
                            return <div className="user-item">
                                <Link to={`/items/${item.id}`}>
                                    <img src={`data:image/jpeg;base64,${item.picture}`}></img>
                                    <h2 id="item-title">{item.name}</h2>
                                    <h3 className="date-price">posted on: {String(item.datePosted).substring(0, 10)}</h3>
                                    <h3 className="date-price">price: {item.price}$</h3>
                                </Link>
                            </div>
                        }): <p>...</p>
                    }
                    </div>
                }
                </div>
            </div>
            }
            {isLoading &&
                <div>
                    <img className="skeleton"></img>
                    {currentUser.getCurrentUser() ? currentUser.getCurrentUser().username === username ? <button className="skeleton" style={{color: 'transparent'}} id="change-pic">change photo</button> : <></> : <></>}
                    <h2 style={{color: 'transparent'}} className="detail skeleton"><span>name: </span>{user.firstName} {user.lastName}</h2>
                    <h2 style={{color: 'transparent'}} className="detail skeleton"><span>username: </span>{username}</h2>
                    <div className="users-posts">
                    {
                        <div className="user-items">
                        {
                            items ? items.map(item => {
                                return <div className="user-item skeleton">
                                    <img ></img>
                                    <h2 style={{color: 'transparent'}} id="item-title">{item.name}</h2>
                                    <h3 style={{color: 'transparent'}} className="date-price">posted on: {String(item.datePosted).substring(0, 10)}</h3>
                                    <h3 style={{color: 'transparent'}} className="date-price">price: {item.price}$</h3>
                                </div>
                            }): <p>...</p>
                        }
                        </div>
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfile;