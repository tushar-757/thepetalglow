import { IonButton,IonIcon, useIonAlert,IonLoading,useIonToast} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { arrowBackCircle } from "ionicons/icons";
import api from "../Services/urlApi";
import { LocalNotifications } from '@ionic-native/local-notifications'
import './cart.css'
import { useDispatch,useSelector } from "react-redux";
import {EmptyCart,AddtoNotification, RemovefromNotification, UserOrders} from '../Actions';
import { Checkout } from 'capacitor-razorpay';
import { useState } from "react";

export default function PaymentGategay(){
    const History=useHistory()
    const [present] = useIonAlert();
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const [present1, dismiss] = useIonToast();
    const grandtotal=useSelector((state)=>state.CartReducer.grandtotal)
    const useraccesstoken=localStorage.getItem('useraccesstoken')
    const razorpayOrderID=localStorage.getItem('razorpayOrderID')
    const ServerorderID=localStorage.getItem('ServerorderID')

    const notificationHandler=(value)=>{
      try{
        LocalNotifications.schedule({
        id:1,
        text: value,
        icon:"https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__480.jpg"
      });
    }catch(e){
       present1(
        {
            color: 'danger',
            duration: 5000,
            message: `something went wrong:${e?.response?.data?.message}`
          })
      }
    }
      const loadCheckout=async()=> {
        const options = {
          key: 'rzp_test_0bM611iljsCqKa',
          amount:grandtotal*100,
          description: 'Credits towards consultation',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnbpr4WKVxpBwwvk2rI0dIx1cCFKnjDAPvFQ&usqp=CAU',
          currency: 'INR',
          name: 'ThePetalGlowStore',
          order_id: razorpayOrderID,
          theme: {
            color: 'green'
          }
        }
        try {
        let data = (await Checkout.open(options));
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=data?.response
        setLoading(true)
        const confirmorder=await api.put("/OrderConfirmation",
        {
          headers:{
            order_id:ServerorderID,
            Authorization:`Bearer ${useraccesstoken}`
          },
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        })
         localStorage.removeItem('razorpayOrderID')
         localStorage.removeItem('ServerorderID')
         dispatch(EmptyCart())
         notificationHandler(`your order with OrderId${confirmorder?.data?.id} is confirmed succesfully.`)
         dispatch(RemovefromNotification(confirmorder?.data?.id))
         dispatch(AddtoNotification(confirmorder.data))
         dispatch(UserOrders())
         History.push('/page/Orders')
         setLoading(false)
         present1(
          {
              color: 'success',
              duration: 2000,
              message: `Order Placed`
            })
        } catch (e) {
          dispatch(EmptyCart())
          setLoading(false)
          present1(
            {
                color: 'danger',
                duration: 5000,
                message: `something went wrong:${e?.response?.data?.message}`
              })
          History.push('/page/ThePetalGlow')
        }
      }
    return(
        <div style={{margin:50}}>
              <div onClick={()=>History.goBack()}>
              <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        duration={15000}
        message={'Please wait...'}
      />
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
            </div>
              <IonButton onClick={() => loadCheckout()}>Go for payment</IonButton>
     </div>
    )
}




