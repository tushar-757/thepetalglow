import { IonButton,IonChip ,IonLabel,useIonToast} from '@ionic/react';
import React, { useRef,useState} from 'react';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {UserSelectedOrder} from '../Actions/index'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AiFillCopy } from 'react-icons/ai';
import moment from 'moment'
import LoadingBox from '../components/LoadingComponent';
import EmptyBox from '../static/box.png'
import './Order.css'

export default function BuyAgain(){
  const History = useHistory();
    const NotActiveOrders=useSelector((state)=>state.OrderReducer.NotActiveOrder)
    const Loading=useSelector((state)=>state.OrderReducer.loading)
    const dispatch=useDispatch()
    const textAreaRef = useRef([]);
    const [copySuccess, setCopySuccess] = useState('');
    const [present1, dismiss] = useIonToast()

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

    return (
      <>
       {(Loading)?<>
       <LoadingBox/>
       </>:
         <div style={{position:'relative'}}>
           {(NotActiveOrders?.length===0||NotActiveOrders===undefined)?
              <div className="emptybox-div">
              <img className="emptybox-div-img" src={EmptyBox}/>
              </div>
              :null}
          {
            NotActiveOrders?.map((data,i)=>(
              <div className="order-box" key={i}>
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
                   <h2>Delivered</h2>
                </div>
                <div>
                  <IonButton style={{color:'white'}}
                  onClick={()=>{
                    dispatch(UserSelectedOrder(data?.id))
                    History.push(`/BuyAgainOrder/${data?.id}`)}}>View Detail</IonButton>
                </div>
              </div>
    ))
          }
     </div>}
     </>
    )
}