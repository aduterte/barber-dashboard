import axios from 'axios';
import BarberReviewForm from './BarberReviewForm'
import ReviewCommentForm from './ReviewCommentForm'
import {useState ,useEffect} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {selectedBarberState, 
        clientsState,
        userState} from '../atoms'

function BarberDetail() {

  const [selectedBarber, setSelectedBarber] = useRecoilState(selectedBarberState),
        client = useRecoilValue(clientsState),
        [reviewToggle, setReviewToggle] = useState(false),
        [input, setInput] = useState({content: "", rating: 0}),
        [cRInput, setCRInput] = useState({content: ""}),
        [editing,setEditing] = useState({}),
        user = useRecoilValue(userState)




  useEffect(() => {
   
    const str = window.location.pathname;
    const n = str.lastIndexOf('/');
    const index = str.substring(n + 1);

    axios.get(`http://localhost:3000/barbers/${index}`)
    .then(res => setSelectedBarber(res.data) )

  },[setSelectedBarber])

  


 function handleDelete(e,id){
    e.preventDefault()
    axios.delete(`http://localhost:3000/barber_reviews/${id}`)
    .then(setSelectedBarber({...selectedBarber, barber_reviews: [...selectedBarber.barber_reviews.filter(r=> r.id !== id)]}));
  }
  function handleCommentDelete(e,id){
    e.preventDefault()
    axios.delete(`http://localhost:3000/barber_review_comments/${id}`,{data: {barber_id: selectedBarber.id}})
    .then(res=> {setSelectedBarber(res.data)});
  }

  function handleCreateToggle(){
    setReviewToggle(-1)
    setEditing(false)
    setInput({content: "", rating: 0, barber_id: selectedBarber.id})
  
  }
  function handleCommentCreate(reviewId){
    setReviewToggle(-1)
    setEditing(false)
    // console.log("selected barber", selectedBarber)
    setCRInput({content: "", barber_id: selectedBarber.id,barber_review_id: reviewId})
  }

  function handleEditClick(review){
    
    setEditing(review)
    setInput({content: review.content, rating: review.rating, barber_id: selectedBarber.id })
    
    setReviewToggle({
      edit: review.id
    })
    
  }
  return ( !selectedClient ? null : (
  <div>
    <h1>Profile Page for {selectedBarber.first_name} {selectedBarber.last_name} </h1>
    <h4>email: {selectedBarber.email}</h4>
 
    {selectedBarber.barber_reviews.map(review=>
      
      <div key={review.id}>
          <div>"{review.content}"</div>
          <div> {review.rating}</div>
          <div>- {client.find(c=> review.client_id === c.id).username}</div>
          
                  {/* make sure that user is logged in and wrote the comment to allow edit capabilities */}
            
                                      
                    {!!review.barber_review_comments.length > 0?
                    <div>
                       <p></p>
                    <div> {review.barber_review_comments[0].content}</div>
                    <div>**{selectedBarber.username}**</div>
                  
                    {review.barber_review_comments[0].barber_id===selectedBarber.id?  
                    <div>
                      <button onClick = {()=>handleCommentEditClick(review.barber_review_comments[0])}> edit</button> 
                              {/*handles form and deletetoggle */}
                              {reviewToggle.edit === review.barber_review_comments[0].id?
                              <div> 
                                <button onClick = {(e)=> handleCommentDelete(e,review.barber_review_comments[0].id)}>Delete</button>
                                  <ReviewCommentForm input={cRInput} setInput={setCRInput} editing={editing} setReviewToggle={setReviewToggle}/>
                              </div>:null    
                              }
                    </div>
                    :null
                    }
                    </div>
                    :
                    <div>
                      {user.id &&
                      <div>
                    <button onClick={()=> handleCommentCreate(review.id)}>leave review</button>
          {reviewToggle === -1 &&
          <ReviewCommentForm input={cRInput} setInput={setCRInput} editing={editing} setReviewToggle={setReviewToggle}/>
          }
          </div>
        }
                    
                    
                    </div>
                    }
          </div>
              
         
    )} 
      </div>
  )
  )
  
    }


    