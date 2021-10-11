import axios from 'axios';
import React, { useEffect, useState } from 'react';
import defaultPhoto from './user.png';
import {FaStar} from 'react-icons/fa';
import './Ratings.css';
import { Link } from 'react-router-dom';

const Ratings = (props) => {
    const [ratings, setRatings] = useState();
    const [ratingUsers, setRatingUsers] = useState();

    const getRatingUsersByIds = async (ids) => {
        let fd = new FormData();
        fd.append('ids', ids);
        axios.post('http://localhost:8080/api/user/view/' , fd)
        .then(res => {
            setRatingUsers(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    const getRatings = async () => {
        try {
            const data = await axios.get(`http://localhost:8080/api/reviews/view/${props.user.id}`);
            const ratings = data.data;
            
            setRatings(ratings);
        }catch(err) {}
    }

    useEffect(() => {
        getRatings();
    }, [props]);

    useEffect(() => {
        const usersIds = [];
        if(ratings){
            ratings.map((element, index) => {
                if(index === 0){
                    usersIds.push(element.ratingUser.id);
                }else{
                    usersIds.push(element.ratingUser);
                }
            })
            getRatingUsersByIds(usersIds);
        }
    }, [ratings]);

    return (
        <div>
            {
                ratings && ratings.length > 0 && ratingUsers && ratingUsers.length === ratings.length && ratings.map((rating, index) => {
                    return <div className="rating-wrapper" key={rating.id}>
                        <Link to={`/user/${ratingUsers[index].username}`}><img className="ratings-pictures" src={ratingUsers[index].profilePicture ? `data:image/jpeg;base64,${ratingUsers[index].profilePicture}` : defaultPhoto}></img></Link>
                        <div className="rating-details-wrapper">
                            <p className="rating-date-posted">{rating.datePosted}</p>
                            {[... new Array(5)].map((star, index) => {
                                return <FaStar className="stars-rated" size={25} key={index} color={index - rating.starsNumber <= -1 ? 'yellow' : 'gray'}/>
                            })}
                        </div>
                        <div className="rating-feedback">
                            <p>{rating.comment}</p>
                        </div>
                    </div>
                }) 
            }
            {
                ratings && ratings.length < 1 &&
                <div className="first-to-write">Be the first to write a review.</div>
            }
        </div>
    )
}

export default Ratings;