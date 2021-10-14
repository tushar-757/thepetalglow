import { IonButton, IonIcon, useIonAlert , IonInput,IonFooter,IonToolbar } from "@ionic/react"
import { addCircle, arrowBackCircle, removeCircle } from "ionicons/icons"
import { Removefromcart, setQuantity,unsetQuantity,GrandTotal, AddtoNotification, UserOrders} from '../Actions';
import { useDispatch,useSelector } from "react-redux";
import { LocalNotifications } from '@ionic-native/local-notifications'
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from "react";
import {BiRupee} from 'react-icons/bi'
import './cart.css'
import api from "../Services/urlApi";



const Item=({ id,title,price,image,quantity,dispatch })=>{
    return(
        <div className="cart-item-cont">
           <div className="cart-item-img-cont">
         <img src={image} className="cart-item-img"/>
           </div>
           <div className="cart-item">
        <div>
         <h1 style={{margin:0,fontSize:14,fontWeight:300}}>{title}</h1>
        </div>
         <div style={{
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '45px'
}}>
           <div style={{backgroundColor:"white"}}  onClick={()=>{
               dispatch(unsetQuantity(id))
              if(quantity===1){
                dispatch(Removefromcart(id))
             }}} style={{backgroundColor:"white"}}>
                <IonIcon md={removeCircle} style={{fontSize:24,color:"#ff00009e"}}/>
            </div>
           <div><h1 style={{margin:'0 8px',fontSize:18,fontWeight:300}}>{quantity}</h1></div>
           <div onClick={()=>dispatch(setQuantity(id))}>
                 <IonIcon md={addCircle} style={{fontSize:24,color:"#4caf50"}}/>
           </div>
         </div>
         </div>
        <div>
            <h1 style={{color:"black",fontSize:16,fontWeight:400}}><BiRupee/>{price}.00</h1>
        </div>
      </div>
    )
}

export default function Cart(){
    const Items=useSelector((state)=>state.CartReducer.items)
    const [present] = useIonAlert();
    const total=useSelector((state)=>state.CartReducer.total)
    const grandtotal=useSelector((state)=>state.CartReducer.grandtotal)
    const User=useSelector((state)=>state.UserReducer)
     const ServerorderID=localStorage.getItem('ServerorderID')
     const razorpayOrderID=localStorage.getItem('razorpayOrderID')
    const [coupon,setCoupon]=useState(0)
    const [couponvalue,setCouponValue]=useState('')
    const [isApplied,setIsApplied]=useState('')
    const dispatch=useDispatch()
    const History=useHistory()
    const [loading,setLoading]=useState(false)
    const ApplyCoupon=()=>{
       if(couponvalue==="HAPPYPLANT30"||couponvalue==='PLANTGIENENEW'&&total!=0){
         const finaltotal=total-coupon
           setCoupon(100)
           dispatch(GrandTotal(finaltotal))
           setIsApplied('Applied Succesfully')
       }else{
           setIsApplied('Coupon is Not Valid')
           dispatch(GrandTotal(total))
       }
    }

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

 const createOrder=async()=>{
        const productids=[]
        Items.map((data)=>{
                const id=data._id
                const quantity=data.quantity
                productids.push({id,quantity})
        })
        console.log(productids)
        setLoading(true)
        const user_id=localStorage.getItem('user_id')
        const useraccesstoken=localStorage.getItem('useraccesstoken')
        const createorder=await api.post('/createOrder',
        {headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
        total:(total*100),
        products:productids,
        shippingAddress:User?.User?.Address,
        lat:User?.lat,
        lng:User?.lng})
        setLoading(false)
        console.log(createorder.data)
        localStorage.setItem('razorpayOrderID',createorder?.data?.OrderId)
        localStorage.setItem('ServerorderID',createorder?.data?.id)
        notificationHandler(`your order with OrderId${createorder?.data?.id} is created succesfully go for payment now`)
        dispatch(AddtoNotification(createorder.data))

   }
// const UpdateOrder=async()=>{
//   const order_id=localStorage.getItem('ServerorderID')
//   const useraccesstoken=localStorage.getItem('useraccesstoken')
//   const createorder=await api.post('/UpdateOrder',{headers:{order_id,Authorization:`Bearer ${useraccesstoken}`},
//    total:(total*100),products:['612f739e3c19b13d6e413622','612f739e3c19b13d6e413622']})
//      console.log(createorder.data)
//       notificationHandler(`your order with OrderId${createorder?.data?.id} is created succesfully go for payment now`)
//       dispatch(AddtoNotification(createorder.data))
//    }


    const ProceedToCheckout=async()=>{
     try{
        if(User.User.username===''){
        History.push('/page/Login')
        }else{
         if(total!=0){
           setLoading(true)
           await createOrder()
           setLoading(false)
           History.push("/page/PaymentGateway")
         }else{
           present({
             cssClass: 'my-css',
             header: 'Alert',
             message: '!!! Your Cart Is Empty !!!',
             buttons: [
               { text: 'Ok', handler: (d) => console.log('ok pressed') },
             ],
             onDidDismiss: (e) => console.log('did dismiss'),
           })
         }
     }
     }catch(e){
      setLoading(false)
      present({
        cssClass: 'my-css',
        header: 'Alert',
        message: `!!! ${e} !!!,please retry`,
        buttons: [
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })
     }
}


    return(
        <div>{(!loading)?
          <>
        <div>
        <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
        </div>
        <div>
         <h1 style={{fontSize:20}}>SubTotal:{grandtotal}</h1>
        </div>
        </div>
            <div>
                {
                    Items.map((item,i)=>(
                        <Item key={i} id={item._id} title={item.name} price={item.price} image={item.images?.[0]}
                        quantity={item.quantity}
                        dispatch={dispatch} />
                    ))
                }
             </div>
                 <div className="coupon-code">
                 <h1 style={{fontSize:"0.8rem",margin:'auto',fontWeight:300}}>coupon code</h1>
                 <IonInput style={{backgroundColor:"white"}}
                 onIonChange={e =>setCouponValue(e.detail.value)} placeholder="Enter Coupon Code" />
                 <IonButton style={{color:"white",fontSize:'0.8rem'}}
                 onClick={()=>ApplyCoupon()}>Apply Coupon</IonButton>
                 <h1 className={(isApplied==='Applied Succesfully')?"coupon-code-h1":'coupon-code-h2'} >{isApplied}</h1>
                 </div>
                 <div className="total-bar">
                     <div>
                         <div className="total-bar-item">
                         <h1 onClick={()=>notificationHandler()}>Sub Total</h1>
                         <h1>{total}</h1>
                         </div>
                     </div>
                     <div>
                         <div className="total-bar-item">
                         <h1>Discount</h1>
                         <h1>-{coupon}</h1>
                         </div>
                     </div>
                     <div>
                       <div className="total-bar-item">
                         <h1>Taxes and Charges</h1>
                         <h1>0</h1>
                         </div>
                     </div>
                     <div>
                       <div className="total-bar-item">
                         <h1>Shipping</h1>
                         <h1>0</h1>
                         </div>
                     </div>
                     <div>
                     <div className="total-bar-item">
                         <h1>Grand Total</h1>
                         <h1>{grandtotal}</h1>
                         </div>
                     </div>
                 </div>
                 <IonFooter>
      <IonToolbar>
          <IonButton onClick={()=>ProceedToCheckout()}>
          Create Order
        </IonButton>
      </IonToolbar>
    </IonFooter>
           </>:<><h1>loading...</h1></>}</div>
    )
}



