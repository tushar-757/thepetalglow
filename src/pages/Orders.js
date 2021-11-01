import { IonButton,IonChip ,IonLabel} from '@ionic/react';
import React, { useState ,useEffect} from 'react';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {UserOrders,UserSelectedOrder,FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct,} from '../Actions/index'
import './Order.css'
import api from '../Services/urlApi';
import moment from 'moment'
import IsLoggedIn from '../Hooks/isLoggedIn';
import { addUser} from "../Actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Orders(){
  const History = useHistory();
  const useraccesstoken=localStorage.getItem('useraccesstoken')
    const Orders=useSelector((state)=>state.OrderReducer.ActiveOrder)
    console.log(Orders)
    const [Order,setOrder]=useState('')
    const Loading=useSelector((state)=>state.OrderReducer.loading)
    const dispatch=useDispatch()
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



    useEffect(() => {
      dispatch(UserOrders());
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
      dispatch(FetchSeasonalProduct())
      dispatch(FetchIndoorProduct())
      dispatch(FetchOutdoorProduct())
      dispatch(FetchPlantersProduct())
    }catch(e){
      console.log(e)
    }
   }
    return (
      <>
       {(Loading)?<>Loading...</>:
         <div style={{position:'relative'}}>
           <h1 style={{margin:'1rem'}}>{(Orders?.length===0||Orders===undefined)?"No Orders To Show":null}</h1>
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
                <Table size="small">
        <TableHead>
          <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Products</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell>Addons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.productsdata?.map((row,i) => (
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.price}</TableCell>
              <TableCell>{row?.quantity}</TableCell>
              <TableCell>{row?.addons?.map((data)=>
                 <>{(data?.whitepebbles?.isAdded)?<>
                   <div>whitepebbles</div>
                   <div>Qty. {data?.whitepebbles?.quantity}</div>
                   <div>Price {data?.whitepebbles?.price}</div>
                  </>:(data?.blackpebbles?.isAdded)?<>
                    <div>blackpebbles</div>
                   <span>Oty. {data?.blackpebbles?.quantity}</span>
                   <span>Price {data?.blackpebbles?.price}</span>
                  </>:(data?.BlackWhitepebbles?.isAdded)?<>
                   <div>BlackWhitepebbles</div>
                   <div>Qty. {data?.BlackWhitepebbles?.quantity}</div>
                   <div>Price {data?.BlackWhitepebbles?.price}</div>
                  </>:(data?.colouredpebbles?.isAdded)?<>
                   <div>colouredpebbles</div>
                   <div>Qty.{data?.colouredpebbles?.quantity}</div>
                   <div>Price {data?.colouredpebbles?.price}</div>
                  </>:null
                   }
                 </>
              )}</TableCell>
            </TableRow>))}
            <div  className="order-box-total">Total:{data?.total}</div>
            </TableBody>
            </Table>
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