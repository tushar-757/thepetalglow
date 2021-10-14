import { IonButton,IonIcon ,IonInput} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { arrowBackCircle } from "ionicons/icons";
import { createProxyMiddleware } from "http-proxy";
import { useState,useEffect } from "react";
import api from "../Services/urlApi";
import './cart.css'
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useDispatch } from "react-redux";
import { addUser } from "../Actions";



export default function Login(){
    const History=useHistory()
    const dispatch=useDispatch()
    const [email1,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [Mobileno,setMobileno]=useState('')
    const [user, user_id] = IsLoggedIn();


    useEffect(() => {
        if (user != null && user_id != null) {
           const parserduser=JSON.parse(user)
            dispatch(addUser({id:parserduser.id,username:parserduser.username,
                mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
           History.push('/page/PlantGiene');
        }
      },[user,user_id])
     const LoginHandler=async(e)=>{
           e.preventDefault()
    try{
          const response=await api.post('/user/login',{email:email1,password})
          console.log(response)
          const { username,email,mobile,Address,id ,token} = response.data
          const user1={
              id:id,
              username:username,
              email:email,
              mobile:mobile,
              Address:Address
          }
          dispatch(addUser({id,username,mobile,email,Address}))
          if (username && id) {
            localStorage.setItem('user',JSON.stringify(user1));
            localStorage.setItem('user_id',id);
            localStorage.setItem('useraccesstoken',token);
            History.goBack();
          }
    }catch(error){
        console.log('🚀 ~ file: Login.js  LoginHandler ~ error', error)
    }
     }


    return(
        <div style={{margin:50}}>
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
            </div>
              {/* <IonButton onClick={() => setShowModal(false)}>Close</IonButton> */}
                             <h1>Login</h1>
                             <form onSubmit={(e)=>{
                                 LoginHandler(e)}}>
                             <IonInput type='email'name="email" value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email/mobile no." required/>
                             <IonInput type='password' name="password"value={password} onIonChange={e =>setPassword(e.detail.value)} placeholder="password" required/>

         <IonButton type="submit">
            Login
        </IonButton>
        </form>
         <IonButton onClick={()=>History.push('/Register')}>
            Register
        </IonButton>
     </div>
    )
}