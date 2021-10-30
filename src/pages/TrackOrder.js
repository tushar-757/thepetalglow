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
export default function TrackOrder(){
    const userOrder=useSelector((state)=>state.OrderReducer.selectedorder)
    const address=useSelector((state)=>state.UserReducer.User.Address)
    const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
    const dispatch=useDispatch();
    const [id,setId]=useState('')

    return(
        <div>
            <div style={{padding:"10px"}}>
                <IonInput placeholder="Search By OrderId" onIonChange={e =>setId(e.detail.value)}/>
                <IonButton style={{color:'white'}} onClick={()=>{
                if(id!=""){
                    dispatch(UserSelectedOrder(id))
                }}}>Submit</IonButton>
                </div>
                <div>
                    <div className="track-body">
                            <div className="track-body-orderid">
                                <h1 className="track-body-orderid-h1">OrderId:-{userOrder?.id}</h1></div>
                        <div style={{padding:"12px",position:"relative",margin:'1rem'}}>
                            <FaJediOrder fontSize={24} className="start-icon"/>
                            <BiPackage fontSize={24} className="packed-icon"/>
                            <FaCarSide fontSize={24} className="depart-icon"/>
                            <TiTick fontSize={24} className="arrive-icon"/>
                    <IonProgressBar value={(userOrder?.status==="created")?0.1:(userOrder?.status==="packed")?0.3:
                    (userOrder?.status==="Dispatched")?0.62:null} color="tertiary"
                    style={{position:'relative'}}>
                        </IonProgressBar><br />
                        <div className="tack-order-dates">
                            <p>OrderPlaced</p>
                            <p>
                                {(userOrder?.createdAt)?moment().format("MMM Do"):userOrder?.createdAt}
                            </p>
                        </div>
                        <div className="tack-order-dates1">
                            <p>Packed</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br> {(userOrder?.createdAt)?moment().format("MMM Do"):userOrder?.createdAt}
                                 (2-3)pm
                            </p>
                        </div>
                        <div className="tack-order-dates2">
                            <p>Dispatched</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br> {(userOrder?.createdAt)?moment().format("MMM Do"):userOrder?.createdAt}
                                 (3-4)pm
                            </p>
                        </div>
                        <div className="tack-order-dates3">
                            <p>Arrived</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br>{(userOrder?.createdAt)?moment().format("MMM Do"):userOrder?.createdAt}
                                 (4-6)pm
                            </p>
                        </div>
                        </div>
                        <div className="track-body-box" style={{marginTop:'55px'}}>Description:-{userOrder?.description}</div>
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
            </div>
                        <IonButton color="danger" style={{margin:"10px"}}>Cancel Order</IonButton>
                        <AiFillInfoCircle style={{color:"grey"}}
                             fontSize={24}
                             onClick={(e) =>
                               present({
                                 event: e.nativeEvent,
                               })
                             }/>
                    </div>
                    <div>
                        <div>
                            <p style={{marginLeft:'10px'}}>Shipping Address</p>
                        </div>
                        <div className="track-ship-to">
                        <p>Ship to</p>
                            <p>{address?.hno}</p>
                            <p>{address?.society}</p>
                            <p>{address?.pincode}</p>
                        </div>
                    </div>
                    <div style={{margin:"7px"}}>
                        <IonButton color="medium" style={{width:'100%'}}>
                        Download Invoice
                        </IonButton>
                    </div>
                </div>
        </div>
    )
}