import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './UserCard.css';
import defaultPhoto from './user.png';

const UserCard = (props) => {
    const [user, setUser] = useState({});


    useEffect(() => {
            axios.get(`http://localhost:8080/api/user/view/${props.username}`)
            .then(resp => {
                setUser(resp.data);
            })
        .catch(err => console.log(err));
    }, []);

    return(
        <div className="user-card">
            <div>
            {user.profilePicture ? <img src={`data:image/jpeg;base64,${user.profilePicture}`}></img> : <img src={defaultPhoto}></img>}

                <div className="user-details">
                    <h3>{user.firstName} {user.lastName}</h3>
                </div>
                <button className="view-user"><Link to={`/user/${user.username}`}>view profile</Link></button>
            </div>
        </div>
    )
}

export default UserCard;