import React, {useState} from 'react'
import {useRecoilValue} from 'recoil'
import {userAtom} from "../atoms"


export default function AccountSettingsComponent(){

    const user = useRecoilValue(userAtom),
        [edit, setEdit] = useState(false)

    return (
        <div className="account-details">
            <div className="account-details-top">
                <div>
                    <img src={user.photo} alt="user avatar" className="medium-avatar"/>
                </div>
                <div className="account-details-username">
                    {user.username}
                </div>
                
            </div>
            <div onClick={()=>{setEdit(!edit)}}>Edit Profile</div>
            <div className="h-line"/>
           
            <div>Your email: {user.email}</div>
            <div>First Name: {user.first_name}</div>
            <div>Last Name: {user.last_name}</div>
            <div>Zip Code: {user.zip_code}</div>
           
            
            
            
        </div>
       
   

    )
}