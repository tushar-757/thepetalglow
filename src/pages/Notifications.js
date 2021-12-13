import { IonButton, IonIcon,IonPage,IonContent, } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCircle, removeCircle } from "ionicons/icons"
import { RemovefromNotification } from '../Actions';
import './Notification.css'
import { useHistory } from 'react-router';
import moment from 'moment'
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useEffect } from 'react';
import { addUser} from "../Actions";
import Header from '../components/Header';
import EmptyBox from '../static/box.png'

export default function Notifications(){
    const Notify=useSelector((state)=>state.NotificationReducer.Notifications)
    const dispatch=useDispatch()
    const History=useHistory(3)
    const [user, user_id] = IsLoggedIn();

    useEffect(() => {
      try{
        if (user != null && user_id != null) {
          // console.log(JSON.parse(JSON.stringify(user)))
           const parserduser=JSON.parse(user)
            dispatch(addUser({id:parserduser.id,username:parserduser.username,
                mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
        }
      }catch(e){
        console.log(e)
      }
    },[user,user_id])

    return(
      <IonPage>
        <Header/>
        <IonContent>
        <div>
           <h1 style={{margin:'1rem'}}>{(Notify?.length===0)?
            <div className="emptybox-div">
            <img className="emptybox-div-img" src={EmptyBox}/>
            </div>
           :null}</h1>
            {Notify.map((data,i)=>(
               <div style={{position:"relative"}} className="white-background">
                  <div className="notification-block">
                      <h3>Notification:{i+1}</h3>
                      <span>PaymentStatus:-{data?.Paymentstatus}</span><br/>
                      <span>OrderId:-{data?.id}</span><br/>
                      <span>Total:-{data?.total}</span><br/>
                      <div style={{color:"black"}}>CreatedAt  {(data?.createdAt)
               ?moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a'):data.createdAt}</div>
                      <div onClick={()=>dispatch(RemovefromNotification(data?.id))} className="remove-notification">
                      <IonIcon md={closeCircle} style={{fontSize:24,color:"#ff00009e"}}/>
                          </div>
                          <IonButton color="tertiary" onClick={()=>History.push("/page/Orders")}>Got to Your Orders</IonButton>
                      </div>
              </div>
            ))}
        </div>
        </IonContent>
        </IonPage>
    )
}