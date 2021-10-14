import { IonButton,IonIcon, useIonAlert,IonInput} from "@ionic/react"
import {useHistory} from 'react-router-dom'
import { arrowBackCircle } from "ionicons/icons";
import api from "../Services/urlApi";
import { LocalNotifications } from '@ionic-native/local-notifications'
import './cart.css'
import { useDispatch,useSelector } from "react-redux";
import {EmptyCart,AddtoNotification, RemovefromNotification} from '../Actions';
import { Checkout } from 'capacitor-razorpay';

export default function PaymentGategay(){
    const History=useHistory()
    const [present] = useIonAlert();
    const dispatch=useDispatch()
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
        alert(e)
      }
    }
      const loadCheckout=async()=> {
        const options = {
          key: 'rzp_live_ir3sDuGInwGl38',
          amount:grandtotal*100,
          description: 'Credits towards consultation',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnbpr4WKVxpBwwvk2rI0dIx1cCFKnjDAPvFQ&usqp=CAU',
          currency: 'INR',
          name: 'ThePetalGlowStore',
          order_id: razorpayOrderID,
          // prefill: {
          //   email: 'void@razorpay.com',
          //   contact: '9191919191',
          //   name: 'Razorpay Software'
          // },
          theme: {
            color: 'green'
          }
        }
        try {
        let data = (await Checkout.open(options));
        console.log(data)
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=data?.response
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
         History.push('/page/Orders')
        } catch (error) {
          dispatch(EmptyCart())
          present({
            cssClass: 'my-css',
            header: 'Alert',
            message: `!!! Your ${error} Is Not Valid Now please recreate your order now !!!`,
            buttons: [
              { text: 'Ok', handler: (d) => console.log('ok pressed') },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
          })
          notificationHandler(`your order is pending for payment.`)
          History.push('/page/PlantGiene')
         console.log(error); //Doesn't appear at all
        }
      }
    return(
        <div style={{margin:50}}>
              <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
            </div>
              <IonButton onClick={() => loadCheckout()}>Go for payment</IonButton>
     </div>
    )
}





    //    async function paymentSuccess(orderId, paymentMethod) {
    //     const paymentStatus='success'
    //     const description=`Payment successful Order Id ${orderId} payment method ${paymentMethod}`;
    //      const paymentstatus=await api.post("/OrderConfirmation",{headers:{order_id:orderId,Authorization:`Bearer ${useraccesstoken}`},paymentStatus,description})
    //      alert(paymentstatus.data)
    //      dispatch(EmptyCart())
    //      History.push('/page/PlantGiene')
    //   }
    //    async function paymentFailed(orderId, paymentMethod) {
    //     const paymentStatus='failed'
    //     const description=`Payment failed Order Id ${orderId} payment method ${paymentMethod}`;
    //      const paymentstatus=await api.post("/OrderConfirmation",{headers:{order_id:orderId,Authorization:`Bearer ${useraccesstoken}`},paymentStatus,description})
    //      alert(paymentstatus.data)
    //      dispatch(EmptyCart())
    //      History.push('/page/PlantGiene')
    //   }
