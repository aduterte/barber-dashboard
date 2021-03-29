
import {userAtom, reviewsAtom, appointmentsAtom, conversationsAtom, portfolioAtom} from "./atoms"
import {useRecoilState, useSetRecoilState} from "recoil"
import API from "./api"

export const useAuthToken = () =>{

    const [user, setUser] = useRecoilState(userAtom),
        setReviews = useSetRecoilState(reviewsAtom),
        setAppointments  = useSetRecoilState(appointmentsAtom),
        [conversations, setConversations] = useRecoilState(conversationsAtom),
        setPortfolio = useSetRecoilState(portfolioAtom)

       
            if (localStorage.token){
            let options = {headers: {'Authenticate': localStorage.token, 'User': localStorage.type}}
            API.get(`/logins`, options)
            .then(res => {
              
              let user = {username: res.data.username, id: res.data.id, first_name: res.data.first_name, last_name: res.data.last_name, email: res.data.email, photo: res.data.photo}
              setUser(user)
              // setUser(res.data)
              setReviews(res.data.barber_reviews)
              setAppointments(res.data.appointments)
              setConversations(res.data.conversations)
              setPortfolio(res.data.photos)
            })
            }  
}

