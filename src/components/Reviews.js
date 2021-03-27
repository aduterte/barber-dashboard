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

    return (
        <div>
         
            {review.client.username}
            <br/>
            {review.content}
           
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
            <div>
                {/* {test()} */}
                {review.barber_review_comment.content}
            </div>}
            
        </div>
    )
}