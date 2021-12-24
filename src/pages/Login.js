import { IonButton,IonIcon ,IonModal, IonPage,IonContent,useIonAlert,IonInput,useIonToast,IonLoading} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { arrowBackCircle } from "ionicons/icons";
import { useState,useEffect } from "react";
import api from "../Services/urlApi";
import './cart.css'
import Header from '../components/Header';
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useDispatch } from "react-redux";
import { addUser } from "../Actions";


export default function Login(){
    const [present] = useIonAlert();
    const [present1, dismiss] = useIonToast();
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
          present1(
            {
                color: 'success',
                duration: 2000,
                message: `You Are LoggedIn`
              })
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
            setLoading(false)
            History.goBack();
          }
    }catch(error){
      setLoading(false)
      setReset(true)
      if(error.message==='Request failed with status code 429'){
        present1(
          {
              color: 'danger',
              duration: 2000,
              message: `"Too many Login requests created from this IP, please try again after 5 minutes`
            })
            return
      }
      present1(
        {
            color: 'danger',
            duration: 2000,
            message: `${error?.response?.data?.message}`
          })
    }
     }
const ResetHandler=async(e)=>{
  e.preventDefault()
  try{
      setLoading(true)
      const response=await api.put("/user/ResetPassword",{
        email:email1
      })
      setLoading(false)
      present1(
        {
            color: 'success',
            duration: 2000,
            message: `Email is sent to your registered account`
          })
  }catch(e){
   setLoading(false)
   present1(
    {
        color: 'danger',
        duration: 5000,
        message: `something went wrong:${e?.response?.data}`
      })
  }
}

    return(
      <>
      <IonPage>
        <Header/>
        <IonContent>
        <div style={{margin:25}}>
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"#008000a8"}}/>
            </div>
            <IonModal isOpen={showModal} cssClass='my-custom-class'  backdropDismiss={false}>
              {/* <IonInput value={newpassword} type="password" onIonChange={(e)=>setNewPassword(e.target.value)} placeholder="New password"/>
              <IonInput value={confirmPassword} type="password" onIonChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm password"/> */}
        <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
      <div style={{padding:"10px"}}>
        <IonInput type='email'name="email" value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email"  autocomplete={true} required/>
        <IonButton color="tertiary" onClick={(e)=>ResetHandler(e)}>Send Reset Password Email</IonButton>
         {/* <div  style={{paddingLeft:"10px"}}><h3>or</h3></div>
         <IonButton color="tertiary">Use Security Questions?</IonButton> */}
        <IonButton onClick={() => setShowModal(false)} style={{color:"white"}}>Close</IonButton>
        </div>
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
                             <IonInput type='email'name="email" value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email"  autocomplete={true} required/>
                             <IonInput type='password' name="password"value={password} onIonChange={e =>setPassword(e.detail.value)} placeholder="password"  autocomplete={true} required/>

         <IonButton type="submit" style={{color:"white"}}>
            Login
        </IonButton>
        <div>
          </div>
        </form>
         <IonButton onClick={()=>History.push('/Register')} color="light"style={{color:"white"}}>
            Register
        </IonButton>
        {/* <div>
         <IonButton onClick={()=>History.push('/Register')} color="tertiary" style={{color:"white"}}>
            Checkout as Guest
        </IonButton>
        </div> */}
       {(reset)?
         <div>
           <IonButton color="light" style={{color:"blue",background:"transparent"}} onClick={()=>{
             setShowModal(true)
             }}>Reset my password?</IonButton>
           </div>
         :null}
     </div>
     </IonContent>
     </IonPage>
     </>
    )
}