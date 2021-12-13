import { IonButton ,IonPage,IonInput,IonContent,IonLoading,IonSelect,IonLabel,IonSelectOption,useIonToast ,IonChip} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { IonIcon } from "@ionic/react";
import { useState } from "react";
import { arrowBackCircle } from "ionicons/icons";
import { addUser } from "../Actions";
import { useSelector,useDispatch } from "react-redux";
import api from "../Services/urlApi";
import './cart.css'
import axios from "axios";
import Header from '../components/Header';


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
    const [loading,setLoading]=useState(false)
    const [present, dismiss] = useIonToast();
    const [city,setCity]=useState("Faridabad")

    //  const AddUserToStore=()=>{
    //       const data={username,email,password,mobile,hno,society,pincode}
    //     }
        const RegisterHandler=async(e)=>{
            e.preventDefault()
           try{
            setLoading(true)
            const response=await api.post('/user/Register',{username:username1,email:email1,password:password1,
                mobile:mobile1,hno:hno1,society:society1,pincode:pincode1})
                present(
                    {
                        color: 'success',
                        duration: 2000,
                        message: 'Registered Successfully'
                      })
                      if(response?.data?.message==="user already exist"){
                        present(
                            {
                                color: 'danger',
                                duration: 2000,
                                message: `check your Credentials`
                              })
                              return
                      }
            const { username,email,mobile,Address,id ,token} = response?.data?.user
            const user1={
                id:id,
                username:username,
                email:email,
                mobile:mobile,
                Address:Address
            }
            setLoading(false)
            dispatch(addUser({id,username,mobile,email,Address}))
            localStorage.setItem('user',JSON.stringify(user1));
            localStorage.setItem('user_id',id);
            localStorage.setItem('useraccesstoken',token);
            History.push("/page/ThePetalGlow");
        }catch(e){
            present(
                {
                    color: 'danger',
                    duration: 3000,
                    message: `something went worng:${e?.response?.data?.message?.message}`
                  })
        }
     }

     const options = {
        cssClass: 'my-custom-interface'
      };
    return(
        <>
        <IonPage>
          <Header/>
          <IonContent>
        <>
        <div style={{margin:25}}>
              {/* <IonButton onClick={() => setShowModal(false)}>Close</IonButton> */}
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:-5}}/>
            </div>
              <IonChip color="warning" style={{height:"60px"}}>
          <IonLabel>Dear Customers Please provide us your best info it Would help us in providing invoices and Shipping status</IonLabel>
        </IonChip>
            <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
                             <h1>Register</h1>
                             <form onSubmit={(e)=>{
                                 RegisterHandler(e)}}>
                             <IonInput name="username"value={username1}
                             autocomplete={true}
                              onIonChange={e =>setUsername(e.detail.value)} placeholder="username" required/>
                             <IonInput type='email' name='email'
                              autocomplete={true}
                             value={email1} onIonChange={e =>setEmail(e.detail.value)} placeholder="email" required/>
                             <IonInput type='password' name="password"
                              autocomplete={true}
                             value={password1}
                             minlength={8}
                             onIonChange={e =>setPassword(e.detail.value)} placeholder="password" required/>
                             <IonInput type='tel' name="mobile"
                              autocomplete={true}
                              pattern="[6789][0-9]{9}"
                             maxlength={10} minlength={10} value={mobile1} onIonChange={e =>setMobileno(e.detail.value)} placeholder="Mobile NO.*" required/>
                             <h1>Address</h1>
                             <IonInput value={hno1} name="hno"
                              autocomplete={true}
                             onIonChange={e =>setHno(e.detail.value)} placeholder="H.no/Flat no." required/>
                             <IonInput value={society1} name="society"
                              autocomplete={true}
                             onIonChange={e =>setStreet(e.detail.value)} placeholder="Street/Society" required/>
                             <IonInput value={pincode1} name="pincode"
                              autocomplete={true}
                              type="text"
                              pattern="[1-9]{1}[0-9]{2}[0-9]{3}"
                             onIonChange={e =>setPincode(e.detail.value)} placeholder="Pincode" required/>
                             {/* <IonInput value='Faridabad' readonly placeholder="Faridabad"/> */}
                             <IonSelect interface="popover" interfaceOptions={options}
                             placeholder="Select City" value={city}
                             onIonChange={(e)=>setCity(e.detail.value)} required>
                                      <IonSelectOption value="Faridabad" class="brown-option">Faridabad</IonSelectOption>
                                      <IonSelectOption value="Gurugram" disabled={true}>Gurugram  coming soon...</IonSelectOption>
                                      <IonSelectOption value="Delhi" disabled={true}>Delhi coming soon...</IonSelectOption>
                                      <IonSelectOption value="Noida" disabled={true}>Noida coming soon...</IonSelectOption>
                                      <IonSelectOption value="Palwal" disabled={true}>Palwal coming soon...</IonSelectOption>
                             </IonSelect>
                                 <IonButton type="submit" style={{color:"white"}}>Register</IonButton>
                             </form>
     </div>
     </>
     </IonContent>
     </IonPage>
     </>
    )
}