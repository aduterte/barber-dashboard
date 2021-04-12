import React, {useState} from 'react';
import API from "../api"
import { userAtom, reviewsAtom} from '../atoms';
import {useRecoilState, useRecoilValue} from "recoil"

export default function Reviews(props){

    const {review, index }= props,
        [reply, setReply] = useState(false),
        [input, setInput] = useState(""),
        user = useRecoilValue(userAtom),
        [reviews, setReviews] = useRecoilState(reviewsAtom)

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleReply = () =>{
        setReply(!reply)
        setInput("")
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = {content: input, barber_id: user.id, barber_review_id: review.id}
        API.post("/barber_review_comments", data)
        .then( res => {
            
            // let i = reviews.indexOf(review)
            let array = [...reviews]
            array[index] = {...array[index], barber_review_comment: res.data}
            
            setReviews(array)
            
            }) 
    }

    function getRating(){
        // const star = () => {
        //     return (<span class="material-icons-outlined">
        //     star
        //     </span>)
        // }
        let fullStar = []
        let emptyStar = []
        for(let i=0; i < review.rating; i++){
           fullStar.push(i)
        }
        for(let i=0; i < 5 - review.rating; i++){
            emptyStar.push(i)
         }
        // return review.rating
        // debugger
        return (
            <div >
            {fullStar.map(num => <span key={num} style={{color: "gold"}} className="material-icons-outlined stars">
            star
            </span>)}
            {emptyStar.map(num => <span key={num} style={{color: "black"}} className="material-icons-outlined stars">
            star
            </span>)}
            </div>
        )
    }

    function formatDate(){
        const date = new Date(review.created_at)
        return date.toLocaleString()
    }

    return (
        <div className="review">
            <div className="review-top">
                <div className="review-top-left">
                    <img src={review.client.photo}/>
                    <div>{review.client.username}</div>
                </div> 
                
                <div>{getRating()}</div>
            </div>
           
            <div className="review-top-date">{formatDate()}</div>
            
            <div className="review-content">
            <q><span className="review-content-text">{review.content}</span></q>
            </div>
            
            {!review.barber_review_comment ? 
            <div>
                {reply && 
                <form onSubmit={handleSubmit}>
                    <input type="text" value={input} placeholder="Enter Reply" onChange={handleInput}/>
                    <input type="submit"/>
                </form>}
                <div onClick={handleReply}>
                    {!reply ? "Reply" : "Cancel"}
                </div>
            </div>
            :
            <div className="review-reply">
                <h4>You Replied:</h4>
                
                <p>{review.barber_review_comment.content}</p>
            </div>}
            
        </div>
    )
}