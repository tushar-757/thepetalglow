import { IonButton ,IonInput} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { IonIcon } from "@ionic/react";
import { useState } from "react";
import { arrowBackCircle } from "ionicons/icons";
import { addUser } from "../Actions";
import { useSelector,useDispatch } from "react-redux";
import api from "../Services/urlApi";
import './cart.css'
import axios from "axios";



export default function Register(){
    const History=useHistory()
    const dispatch=useDispatch()
    const [username1,setUsername]=useState('')
    const [email1,setEmail]=useState('')
    const [password1,setPassword]=useState('')
    const [mobile1,setMobileno]=useState('')
    const [hno1,setHno]=useState('')
    const [society1,setStreet]=useState('')
    const [pincode1,setPincode]=useState('')
    const [verify,setverify]=useState(false)

    //  const AddUserToStore=()=>{
    //       const data={username,email,password,mobile,hno,society,pincode}
    //     }
        const RegisterHandler=async(e)=>{
            e.preventDefault()
           try{
            const response=await api.post('/user/Register',{username:username1,email:email1,password:password1,
                mobile:mobile1,hno:hno1,society:society1,pincode:pincode1})
            console.log(response.data[0])
            const {username,mobile,email,Address,token}=response.data[0];
            const {id}=response.data[0]._id.$oid
            const user1={
                id:id,
                username:username,
                email:email,
                mobile:mobile,
                Address:Address
            }
            dispatch(addUser({id,username,mobile,email,Address}))
            localStorage.setItem('user',JSON.stringify(user1));
            localStorage.setItem('user_id',id);
            localStorage.setItem('useraccesstoken',token);
            History.goBack();
        }catch(e){
            console.log(e)
        }
     }

     const verifyHandler=async()=>{
           const response= await api.post("/user/verifyEmail",{email:email1})
           console.log(response)
     }
    return(
        <div style={{margin:50}}>
              {/* <IonButton onClick={() => setShowModal(false)}>Close</IonButton> */}
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
            </div>
                             <h1>Register</h1>
                             <form onSubmit={(e)=>{
                                 RegisterHandler(e)}}>
                             <IonInput name="username"value={username1} onIonChange={e =>setUsername(e.detail.value)} placeholder="username" required/>
                             <IonInput type='email' name='email' value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email" required/>
                             <IonButton onClick={()=>verifyHandler()} style={{color:"white"}}>verify</IonButton>
                             <IonInput type='password' name="password" value={password1} onIonChange={e =>setPassword(e.detail.value)} placeholder="password" required/>
                             <IonInput type='number' name="mobile" min='10' value={mobile1} onIonChange={e =>setMobileno(e.detail.value)} placeholder="Mobile NO.*" required/>
                             <h1>Address</h1>
                             <IonInput value={hno1} name="hno" onIonChange={e =>setHno(e.detail.value)} placeholder="H.no/Flat no."/>
                             <IonInput value={society1} name="society" onIonChange={e =>setStreet(e.detail.value)} placeholder="Street/Society"/>
                             <IonInput value={pincode1} name="pincode"onIonChange={e =>setPincode(e.detail.value)} placeholder="Pincode"/>
                             <IonInput value='Faridabad' readonly placeholder="Faridabad"/>
                             {(verify)?
                                 <IonButton type="submit" style={{color:"white"}}>Register</IonButton>
                              : <IonButton color="medium" onClick={()=>alert('you need to verify your emailId first')}>Register</IonButton>}
                             </form>
     </div>
    )
}