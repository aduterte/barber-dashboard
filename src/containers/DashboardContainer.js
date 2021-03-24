import React, {useState} from 'react';
import {userAtom} from "../atoms"
import {useRecoilValue} from "recoil"
import Reviews from '../components/Reviews';
import AppointmentsComponent from '../components/AppointmentsComponent';
import PortfolioSettings from '../components/PortfolioSettings';
import DashboardUserInfoComponent from '../components/DasboardUserInfoComponent';


export default function DashboardContainer(){

    const user = useRecoilValue(userAtom),
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
                dashboard details go here
                {isReviews &&
                <div className="reviews">
                    {user.barber_reviews.map((review, i) => <Reviews key={`review${review.id}`} index={i} review={review}/>)}
               
                </div>}
                {isAppointments && <AppointmentsComponent/>}
                {isPortfolio && <PortfolioSettings/>}
            </div>
           
            
        </div>
    )
}