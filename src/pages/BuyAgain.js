import { IonButton,IonChip ,IonLabel} from '@ionic/react';
import React, { useState ,useEffect} from 'react';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {UserSelectedOrder} from '../Actions/index'
import './Order.css'
import moment from 'moment'

export default function BuyAgain(){
  const History = useHistory();
    const NotActiveOrders=useSelector((state)=>state.OrderReducer.NotActiveOrder)
    const Loading=useSelector((state)=>state.OrderReducer.loading)
    const dispatch=useDispatch()



    return (
      <>
       {(Loading)?<>Loading...</>:
         <div style={{position:'relative'}}>
            <h1 style={{margin:'1rem'}}>{(NotActiveOrders?.length===0||NotActiveOrders===undefined)?"No Orders To Show":null}</h1>
          {
            NotActiveOrders?.map((data)=>(
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
                   <h2>Delivered</h2>
                </div>
              </div>
    ))
          }
     </div>}
     </>
    )
}