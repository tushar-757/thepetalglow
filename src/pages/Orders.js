import { IonButton,IonChip ,IonLabel} from '@ionic/react';
import React, { useState ,useEffect} from 'react';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {UserOrders,UserSelectedOrder,addUser} from '../Actions/index'
import IsLoggedIn from '../Hooks/isLoggedIn';
import { LocalNotifications } from '@ionic-native/local-notifications'
import './Order.css'
import api from '../Services/urlApi';
import moment from 'moment'

export default function Orders(){
  const History = useHistory();
  const useraccesstoken=localStorage.getItem('useraccesstoken')
    const Orders=useSelector((state)=>state.OrderReducer.Order)
    console.log(Orders)
    const [Order,setOrder]=useState('')
    const Loading=useSelector((state)=>state.OrderReducer.loading)
    const dispatch=useDispatch()



    useEffect(() => {
      // dispatch(UserOrders());
      setOrder(Orders)
      console.log('happy')
    },[]);

   const DeleteHandler=async (id)=>{
     console.log(id)
     try{
       const orderdelete=await api.delete('/DeleteOrder',{headers:{order_id:id,Authorization:`Bearer ${useraccesstoken}`
        }
      })
      dispatch(UserOrders())
    }catch(e){
      console.log(e)
    }
   }
    return (
      <>
       {(Loading)?<>Loading...</>:
         <div style={{position:'relative'}}>
          {
            Orders?.map((data)=>(
              <div className="order-box">
                <div className="order-box-1stdiv">
                  <div className="order-box-1stdiv-head">OrderId:
                  <p>{data?.id}</p></div>
                  {(data?.Paymentstatus==='failed')?
                  <>
                  <IonChip color="danger" className="pay-tag-box">
                     <IonLabel color="danger">PaymentFailed</IonLabel>
                  </IonChip></>:
                  (data?.Paymentstatus==='success')?
                  <>
                  <IonChip color="success" className="pay-tag-box">
                  <IonLabel color="success"> PaymentSuccess</IonLabel>
                  </IonChip></>:
                    <>
                  <IonChip color="warning" className="pay-tag-box">
                    <IonLabel color="warning">PaymentPending</IonLabel>
                  </IonChip></>
                  }
                </div>
                <div style={{margin:"8px 0"}}>Products List</div>
                <div>
                  <div className="product-table">
                    <div className="product-table-head">
                      <span>s.no.</span>
                      <span>Product name</span>
                      <span>Price</span>
                      <span>Qty.</span>
                      </div>
                   {data?.productsdata.map((data,i)=>(
                     <div className="product-table-item">
                         <p>{i+1}</p>
                          <div>{data?.name}</div>
                          <div>{data?.price}</div>
                          <div>{data?.quantity}</div>
                    </div>
                     ))}
                     <div  className="order-box-total">Total:{data?.total}</div>
                  </div>
                </div>
               <div style={{color:"black"}}>CreatedAt  {(data?.createdAt)
               ?moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a'):data.createdAt}</div>
               <div>
                {(data?.Paymentstatus==="success")?
                <>
                 <p style={{color:'cadetblue'}}>Order Placed Successfully</p>
                 <div className="order-code-div">
                <IonButton className="order-pay-btn"
                onClick={()=>{
                  dispatch(UserSelectedOrder(data?.id))
                  History.push(`/page/TrackOrder/${data?.id}`)}}>Track Order</IonButton>
                  <h2 className="order-code">{data?.code}</h2>
                 </div>
                </>:
                (data?.Paymentstatus==="pending")?
                <>
                  <IonButton className="order-pay-btn"
                onClick={()=>{
                 localStorage.setItem('ServerorderID',data?.id)
                  localStorage.setItem('razorpayOrderID',data?.OrderId)
                  History.push('/page/PaymentGateway')
                  }}>Pay</IonButton>
                  <IonButton className="order-pay-btn" color='danger'
                onClick={()=>History.push('/page/PaymentGateway')} onClick={()=>DeleteHandler(data?.id)}>delete Order</IonButton></>:
                <>
                <p style={{color:'crimson'}}>Order is not placed</p>
                <IonButton className="order-pay-btn" onClick={()=>History.push('/page/PaymentGateway')}>Retry Payment</IonButton>
                <IonButton className="order-pay-btn" color='danger' onClick={()=>DeleteHandler(data?.id)}>Delete Order</IonButton>
                </>}
                </div>
              </div>
    ))
          }
     </div>}
     </>
    )
}