import React, {useState} from 'react';
import API from "../api"
import { userAtom } from '../atoms';
import {useRecoilState} from "recoil"

export default function Reviews(props){

    const review = props.review,
        [reply, setReply] = useState(false),
        [input, setInput] = useState(""),
        [user, setUser] = useRecoilState(userAtom)

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
        // debugger
        API.post("/barber_review_comments", data)
        .then( res => {
            // let comments = [...user.barber_review_comments]
            // comments.push(res.data)
            // setUser({...user, ['barber_reviews']: [...user.barber]})
            setUser(res.data)
        })
    }

    return (
        <div>
            {review.client.username}
            <br/>
            {review.content}
            {review.barber_review_comments.length === 0 ? 
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
                {review.barber_review_comments[0].content}
            </div>}
        </div>
    )
}