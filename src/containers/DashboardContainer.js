import React, {useState} from 'react';
import {userAtom, reviewsAtom} from "../atoms"
import {useRecoilValue} from "recoil"
import Reviews from '../components/Reviews';
import AppointmentsComponent from '../components/AppointmentsComponent';
import PortfolioSettings from '../components/PortfolioSettings';
import DashboardUserInfoComponent from '../components/DasboardUserInfoComponent';
import ConversationList from '../components/Conversationlist';


export default function DashboardContainer(){

    const user = useRecoilValue(userAtom),
        reviews = useRecoilValue(reviewsAtom),
        [isReviews, setIsReviews] = useState(false),
        [isAppointments, setIsAppointments] = useState(false),
        [isPortfolio, setIsPortfolio] = useState(false)

    function selectReviews(){
        setIsReviews(true)
        setIsAppointments(false)
        setIsPortfolio(false)
    }

    function selectAppointments() {
        setIsReviews(false)
        setIsAppointments(true)
        setIsPortfolio(false)
    }

    function selectPortfolio() {
        setIsReviews(false)
        setIsAppointments(false)
        setIsPortfolio(true)
    }

    

    // debugger
    return(
        <div id="dashboard-container">
            <div className="dashboard-left">
                <DashboardUserInfoComponent user={user}/>
                <h4>Dashboard</h4>
                <div onClick={selectReviews}>My Reviews</div>
                <div onClick={selectAppointments}>My Appointments</div>
                <div onClick={selectPortfolio}>My Portfolio</div>
                
            </div>
            <div className="dashboard-right">
                {isReviews &&
                <div className="reviews">
                    {reviews.map((review, i) => 
                    
                    <Reviews key={`review${review.id}`} index={i+1} review={review}/>)
                    }
                </div>}
            
                {isAppointments && <AppointmentsComponent/>}
                {isPortfolio && <PortfolioSettings/>}
                
            </div>
           
            
        </div>
    )
}