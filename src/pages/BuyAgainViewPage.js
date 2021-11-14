import { IonButton, IonInput, IonItem ,IonList,IonListHeader,useIonPopover,IonProgressBar} from "@ionic/react";
import {  useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { BiPackage } from "react-icons/bi";
import {FaCarSide} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'
import {FaJediOrder} from 'react-icons/fa'
import './TrackOrder.css'
import {  UserOrders, UserSelectedOrder } from "../Actions";
import moment from 'moment'
import {AiFillInfoCircle} from 'react-icons/ai'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function PopoverList({ onHide }){
    return (
   <IonList>
     <IonListHeader>Terms & Conditions</IonListHeader>
     <IonItem button>Once Order is Packed you Cannot Cancel It</IonItem>
     <IonItem button>if you want to change Delievery date or timing then put your orderid in customer service
     and change your Delievery timing</IonItem>
   </IonList>
 )}
export default function BuyAgainViewPage(){
    const userOrder=useSelector((state)=>state.OrderReducer.selectedorder)
    const address=useSelector((state)=>state.UserReducer.User.Address)
    const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
    const dispatch=useDispatch();
    const [id,setId]=useState('')

    return(
        <div>
                <div style={{margin:"0.3rem"}}>
                    <div className="track-body">
                            <div className="track-body-orderid">
                                <h1 className="track-body-orderid-h1">OrderId:-{userOrder?.id}</h1></div>
                         <div style={{overflowX:'auto'}}>
                        <Table size="small" style={{width:'95%',margin:'16px'}}>
        <TableHead>
          <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>SkU</TableCell>
              <TableCell>Products</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Qty.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrder?.productsdata?.map((row,i) => (
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{row?.SKU}</TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.price}</TableCell>
              <TableCell>{row?.quantity}</TableCell>
            </TableRow>))}
            <div  className="order-box-total">Total:{userOrder?.total}</div>
            </TableBody>
            </Table>
            <div>
            </div>
            </div>
                {userOrder?.customization?.map((data)=>
                   <p className="track-order-custom">{data}</p>
                )}
                    </div>
                    <div>
                        <div>
                            <p style={{marginLeft:'10px',backgroundColor:"white"}}>Shipping Address</p>
                        </div>
                        <div className="track-ship-to">
                        <p>Ship to</p>
                            <p>{address?.hno}</p>
                            <p>{address?.society}</p>
                            <p>{address?.pincode}</p>
                        </div>
                    </div>
                    <div style={{margin:"7px"}}>
                        <IonButton color="dark" style={{width:'100%'}}>
                        Download Invoice
                        </IonButton>
                    </div>
                </div>
        </div>
    )
}