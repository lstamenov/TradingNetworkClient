import React, { useEffect, useState } from 'react';
import {FaStar} from 'react-icons/fa';
import './Rating.css';
import defaultPhoto from './user.png';
import axios from 'axios';
import header from '../services/auth-header';

const Rating = (props) => {
    const [rating, setRating] = useState();
    const [hover, setHover] = useState();
    const [currentUser, setCurrentUser] = useState();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/view/${props.user.username}`)
        .then(res => setCurrentUser(res.data))
        .catch(err => console.log(err));
    }, []);

    const submitReviewHandler = () => {
        let comment = document.querySelector('.comment');
        const request = {
            'ratingUserId': currentUser.id,
            'starsRated': rating,
            'comment': comment.value,
            'ratedUserId': props.seller.id
        }

        if(rating){
            axios.post('http://localhost:8080/api/user/add/review', request, {headers: header.authHeader()})
            .then(res => console.log(res))
            .catch(err => console.log(err));
            comment.value = '';
            setRating(0);
            window.location.reload();
        }
    }

    return (
        <div className="write-review-wrapper">
            <img className="rating-user-picture" src={currentUser ? currentUser.profilePicture ? `data:image/jpeg;base64,${currentUser.profilePicture}` : defaultPhoto : defaultPhoto}></img>
            <div className="content">
            {
                [...new Array(5)].map((star, index) => {
                    return <label key={index}>
                        <input value={index + 1} onClick={() => setRating(index + 1)} style={{"display": "none"}}  type="radio" />
                        <FaStar size={30} onMouseEnter={() => setHover(index + 1)} onMouseLeave={() => setHover(null)} color={rating ? rating >= index + 1 ? 'yellow' : 'gray' : hover ? hover >= index + 1 ? 'yellow' : 'gray' : 'gray'} className="star"/>
                    </label>
                })
            }
            <br/><textarea className="comment"></textarea>
            <button onClick={submitReviewHandler} className="submit-review-button">Submit review</button>
            </div>
        </div>
    )
}

export default Rating;