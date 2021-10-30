import { IonButton,IonIcon ,IonModal, IonTitle,useIonAlert,IonInput,IonLoading} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { arrowBackCircle } from "ionicons/icons";
import { createProxyMiddleware } from "http-proxy";
import { useState,useEffect } from "react";
import api from "../Services/urlApi";
import './cart.css'
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useDispatch } from "react-redux";
import { addUser } from "../Actions";
import { TiSocialPinterest } from "react-icons/ti";



export default function Login(){
    const [present] = useIonAlert();
    const History=useHistory()
    const dispatch=useDispatch()
    const [email1,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [newpassword,setNewPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Mobileno,setMobileno]=useState('')
    const [user, user_id] = IsLoggedIn();
    const [showModal, setShowModal] = useState(false);
    const [loading,setLoading]=useState(false)
    const [reset,setReset]=useState(false)

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
          setLoading(true)
          const response=await api.post('/user/login',{email:email1,password})
          setLoading(false)
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
            // alert(response?.data?.message)
            setLoading(false)
            History.goBack();
          }
    }catch(error){
       present({
        cssClass: 'my-css',
        header: 'Alert',
        message: 'Check Your Credentials',
        buttons: [
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })
      setLoading(false)
      setReset(true)
    }
     }
const ResetHandler=async(e)=>{
  e.preventDefault()
  try{
    if(newpassword===confirmPassword){
      setLoading(true)
      const response=await api.put("/user/ResetPassword",{
        email:email1,password:confirmPassword
      })
      setLoading(false)
      present({
        cssClass: 'my-css',
        header: 'Alert',
        message: `${response?.data?.message}`,
        buttons: [
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })
    }else{
      present({
        cssClass: 'my-css',
        header: 'Alert',
        message: 'password not matched',
        buttons: [
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })
    }
  }catch(e){
    present({
      cssClass: 'my-css',
      header: 'Alert',
      message: 'Failed To Update ChecK Your Credentials,register instead',
      buttons: [
        { text: 'Ok', handler: (d) => console.log('ok pressed') },
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
    setLoading(false)
  }
}

    return(
        <div style={{margin:50}}>
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
            </div>
            <IonModal isOpen={showModal} cssClass='my-custom-class'>
              <IonInput value={newpassword} type="password" onIonChange={(e)=>setNewPassword(e.target.value)} placeholder="New password"/>
              <IonInput value={confirmPassword} type="password" onIonChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm password"/>
        <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
        <IonButton color="tertiary" onClick={(e)=>ResetHandler(e)}>reset password</IonButton>
        <IonButton onClick={() => setShowModal(false)} style={{color:"white"}}>Close</IonButton>
      </IonModal>
            <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
      />
              {/* <IonButton onClick={() => setShowModal(false)}>Close</IonButton> */}
                             <h1>Login</h1>
                             <form onSubmit={(e)=>{
                                 LoginHandler(e)}}>
                             <IonInput type='email'name="email" value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email/mobile no." required/>
                             <IonInput type='password' name="password"value={password} onIonChange={e =>setPassword(e.detail.value)} placeholder="password" required/>

         <IonButton type="submit" style={{color:"white"}}>
            Login
        </IonButton>
        <div>
          </div>
        </form>
         <IonButton onClick={()=>History.push('/Register')} style={{color:"white"}}>
            Register
        </IonButton>
       {(reset)?
         <div>
           <IonButton color="light" style={{color:"blue",background:"transparent"}} onClick={()=>{
             setShowModal(true)
             }}>Reset my password?</IonButton>
           </div>
         :null}
     </div>
    )
}