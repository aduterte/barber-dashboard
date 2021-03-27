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
        [isPortfolio, setIsPortfolio] = useState(false),
        [isConvo, setIsConvo] = useState(false)

    function selectReviews(){
        setIsReviews(true)
        setIsAppointments(false)
        setIsPortfolio(false)
        setIsConvo(false)
    }

    function selectAppointments() {
        setIsReviews(false)
        setIsAppointments(true)
        setIsPortfolio(false)
        setIsConvo(false)
    }

    function selectPortfolio() {
        setIsReviews(false)
        setIsAppointments(false)
        setIsPortfolio(true)
        setIsConvo(false)
    }

    function selectConvo() {
        setIsReviews(false)
        setIsAppointments(false)
        setIsPortfolio(false)
        setIsConvo(true)
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
                <div onClick={selectConvo}>My Convos</div>
            </div>
            <div className="dashboard-right">
                {isReviews &&
                <div className="reviews">
                    {reviews.map((review, i) => 
                    
                    <Reviews key={`review${review.id}`} index={i+1} review={review}/>)
                    }
                </div>}
                {isConvo && <ConversationList/>}
                {isAppointments && <AppointmentsComponent/>}
                {isPortfolio && <PortfolioSettings/>}
                
            </div>
           
            
        </div>
    )
}