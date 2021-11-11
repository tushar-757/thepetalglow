import { IonButton,IonPage,useIonLoading, useIonToast,IonHeader, IonContent, IonInput } from '@ionic/react';
import { useState } from 'react';
import {  useDispatch} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom'
import api from '../Services/urlApi';


export default function PasswordReset(){
    const [present1, dismiss] = useIonToast();
    const dispatch=useDispatch();
    const History = useHistory();
    const {userId,token}=useParams()
    console.log(userId,token)
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")

     const ResetHandler=async(e)=>{
         e.preventDefault();
         try{
             if(password===confirmpassword){
                 const response=await api.put(`/${userId}/${token}`,{password})
                 console.log(response)
                 present1(
                     {
                         color: 'success',
                         duration: 2000,
                         message: `password reset successfully`
                       })
                             History.push("/page/ThePetalGlow")
                       return
             }
             present1(
                {
                    color: 'danger',
                    duration: 2000,
                    message: `password does not match`
                  })
                //   History.push("/page/ThePetalGlow")
         }catch(e){
             if(e.response.status===400){
                present1(
                    {
                        color: 'danger',
                        duration: 3000,
                        message: `${e.response.data.message}`
                      })
                      History.push("/page/ThePetalGlow")
                      return
             }
            present1(
                {
                    color: 'danger',
                    duration: 3000,
                    message: `${e.response.data.message}`
                  })
                  History.push("/page/ThePetalGlow")
         }
     }
return(

    <IonPage>
        <IonHeader>
            <div style={{color:"whitesmoke"}}>
              Reset Password
              </div>
        </IonHeader>
        <IonContent>
            <div style={{margin:"20px"}}>
                <div>
                    <form onSubmit={(e)=>ResetHandler(e)}>
            <IonInput placeholder="new password" value={password} onIonChange={(e)=>setPassword(e.detail.value)} required/>
            <IonInput placeholder="confirm password" value={confirmpassword} onIonChange={(e)=>setConfirmPassword(e.detail.value)} required/>
            <IonButton style={{color:"white"}} type="submit">sumbit</IonButton>
            </form>
            </div>
            </div>
        </IonContent>
    </IonPage>
)
}