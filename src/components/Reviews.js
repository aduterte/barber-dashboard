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
            {fullStar.map(num => <span style={{color: "gold"}} className="material-icons-outlined stars">
            star
            </span>)}
            {emptyStar.map(num => <span style={{color: "black"}} className="material-icons-outlined stars">
            star
            </span>)}
            </div>
        )
    }

    return (
        <div>
         
            {review.client.username}
            <br/>
            {getRating()}
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