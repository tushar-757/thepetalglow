import { IonIcon } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCircle, removeCircle } from "ionicons/icons"
import { RemovefromNotification } from '../Actions';


export default function Notifications(){
    const Notify=useSelector((state)=>state.NotificationReducer.Notifications)
    const dispatch=useDispatch()
    return(
        <div>
            {Notify.map((data,i)=>(
               <div>
                  <div>
                      <span>PaymentStatus:-{data?.Paymentstatus}</span>
                      <span>OrderId:-{data?.id}</span>
                      <div onClick={()=>dispatch(RemovefromNotification(data?.id))}>
                      <IonIcon md={closeCircle} style={{fontSize:24,color:"#ff00009e"}}/>
                          </div>
                      </div>
              </div>
            ))}
        </div>
    )
}