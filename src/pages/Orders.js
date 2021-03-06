import { IonButton,IonPage,IonContent,IonChip ,IonLabel,useIonToast} from '@ionic/react';
import React, { useState,useRef ,useEffect} from 'react';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {UserOrders,UserSelectedOrder,FetchSoilFertilzerProduct,FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct,} from '../Actions/index'
import './Order.css'
import api from '../Services/urlApi';
import moment from 'moment'
import Header from '../components/Header';
import IsLoggedIn from '../Hooks/isLoggedIn';
import { addUser} from "../Actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { AiFillCopy } from 'react-icons/ai';
import TableRow from '@material-ui/core/TableRow';
import LoadingBox from '../components/LoadingComponent';
import EmptyBox from '../static/box.png'

export default function Orders(){
  const History = useHistory();
  const useraccesstoken=localStorage.getItem('useraccesstoken')
    const Orders=useSelector((state)=>state.OrderReducer.ActiveOrder)
    const [Order,setOrder]=useState('')
    const Loading=useSelector((state)=>state.OrderReducer.loading)
    const dispatch=useDispatch()
    const [user, user_id] = IsLoggedIn();
    const [present1, dismiss] = useIonToast();
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef([]);

    useEffect(() => {
      try{
        if (user != null && user_id != null) {
           const parserduser=JSON.parse(user)
            dispatch(addUser({id:parserduser.id,username:parserduser.username,
                mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
        }
      }catch(e){
        present1(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${e?.response?.data?.message}`
            })
      }
    },[user,user_id])



    useEffect(() => {
      dispatch(UserOrders())
    },[]);
    useEffect(()=>{
      if(Orders!=undefined&&Array.isArray(Orders)){
        setOrder(Orders)
      }
    },[Orders])

   const DeleteHandler=async (id)=>{
     try{
       const response=await api.put('/DeleteOrder',{headers:{order_id:id,Authorization:`Bearer ${useraccesstoken}`
        }
      })
      present1(
        {
            color: 'warning',
            duration: 2000,
            message: `order deleted`
          })
      dispatch(UserOrders())
      dispatch(FetchSeasonalProduct())
      dispatch(FetchIndoorProduct())
      dispatch(FetchOutdoorProduct())
      dispatch(FetchPlantersProduct())
      dispatch(FetchSoilFertilzerProduct())
    }catch(e){
      present1(
        {
            color: 'danger',
            duration: 5000,
            message: `something went wrong:${e?.response?.data?.message}`
          })
    }
   }
   function copyToClipboard(e,i) {
    navigator.clipboard.writeText(textAreaRef.current[i].value)
    e.target.focus();
    setCopySuccess('Copied!');
    present1(
      {
          color: 'success',
          duration: 2000,
          message: `copied`
        })
  };

  // function check() {
  //   var now = moment();
  //   var hourToCheck = (now.day() !== 0)?17:15;
  //   // var dateToCheck = ;
  //   return moment().isAfter(dateToCheck);
  // }

  useEffect(() => {
    textAreaRef.current = textAreaRef.current.slice(0, Orders?.length);
 }, [Orders]);
    return (
      <>
      <IonPage>
        <Header/>
        <IonContent>
       {(Loading)?<><LoadingBox/></>:
         <div style={{position:'relative'}}>
          {(Orders?.length===0||Orders===undefined)?
             <div className="emptybox-div">
              <img className="emptybox-div-img" src={EmptyBox}/>
              </div>
          :null}
          {
            Orders?.map((data,i)=>(
              <div className="order-box" key={data?.id}>
                <div className="order-box-1stdiv">
                  <div className="order-box-1stdiv-head">OrderId:
                  <textarea className="order-id" colms={25}  ref={el => textAreaRef.current[i] = el}  readOnly
                  value={(data?.id)}/>
                  <div className="order-id-copy">
                    <AiFillCopy onClick={(e)=>copyToClipboard(e,i)}  />
             </div>
                  </div>
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
                <div style={{overflowX:"auto"}}>
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
              <TableCell>{row?.addons?.map((data,i)=>
                 <div key={i}>{(data?.whitepebbles?.isAdded)?<>
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
                 </div>
              )}</TableCell>
            </TableRow>))}
            </TableBody>
            </Table>
            <div>Shipping Charge:{data?.shipping}</div>
            <div>Discount:{data?.discount}</div>
            <div  className="order-box-total">Total:{data?.total}</div>
                </div>
               <div style={{color:"black"}}>CreatedAt  {(data?.createdAt)
               ?moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a'):data.createdAt}</div>
               <div>
                 <div>
                   {(data?.userRequestedDate)?'your requested date:'+moment(data?.userRequestedDate).format("MMM Do"):null}
                   </div>
                {(data?.Paymentstatus==="success")?
                <>
                 <p style={{color:'cadetblue'}}>Order Placed Successfully</p>
                 <div className="order-code-div">
                <IonButton className="order-pay-btn"
                onClick={()=>{
                  dispatch(UserSelectedOrder(data?.id))
                  History.push(`/TrackOrder/${data?.id}`)}}>Track Order</IonButton>
                  <h2 className="order-code">{data?.code}</h2>
                 </div>
                </>:
                (data?.Paymentstatus==="pending"&&data?.PaymentMethod==='online')?
                <>
                  <IonButton className="order-pay-btn"
                onClick={()=>{
                 localStorage.setItem('ServerorderID',data?.id)
                  localStorage.setItem('razorpayOrderID',data?.OrderId)
                  History.push('/page/PaymentGateway')
                  }}>Pay</IonButton>
                  <IonButton className="order-pay-btn" color='danger'
                onClick={()=>History.push('/page/PaymentGateway')} onClick={()=>DeleteHandler(data?.id)}>delete Order</IonButton></>
                :(data?.Paymentstatus==='pending'&&data?.PaymentMethod==='cod')?
                <>
                <p style={{color:'success'}}>Order is placed succesfully</p>
                <p style={{color:'success'}}>paymentmethod:COD</p>
                <IonButton className="order-pay-btn"
                onClick={()=>{
                  dispatch(UserSelectedOrder(data?.id))
                  History.push(`/TrackOrder/${data?.id}`)}}>Track Order</IonButton>
                </>:                <>
                  <IonButton className="order-pay-btn"
                onClick={()=>{
                 localStorage.setItem('ServerorderID',data?.id)
                  localStorage.setItem('razorpayOrderID',data?.OrderId)
                  History.push('/page/PaymentGateway')
                  }}>Pay</IonButton>
                  <IonButton className="order-pay-btn" color='danger'
                onClick={()=>History.push('/page/PaymentGateway')} onClick={()=>DeleteHandler(data?.id)}>delete Order</IonButton></>}
                </div>
              </div>
    ))
          }
     </div>}
     </IonContent>
     </IonPage>
     </>
    )
}