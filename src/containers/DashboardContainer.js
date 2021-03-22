import React from 'react';
import {userAtom} from "../atoms"
import {useRecoilState} from "recoil"
import Reviews from '../components/Reviews';


export default function DashboardContainer(){

    const [user, setUser] = useRecoilState(userAtom)


    return(
        <div id="dashboard-container">
            <div className="dashboard-left">
                Welcome {user.username}
                {console.log(user)}
            </div>
            <div className="dashboard-right">
                dashboard details
            </div>
            <div className="reviews">
                {user.barber_reviews.map(review => <Reviews key={`review${review.id}`} review={review}/>)}
               
            </div>
            
        </div>
    )
}