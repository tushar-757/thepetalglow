import { IonButton,IonPage,IonContent, IonInput, IonItem ,IonList,IonListHeader,useIonPopover,IonProgressBar} from "@ionic/react";
import {  useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { BiPackage } from "react-icons/bi";
import {FaCarSide} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'
import {FaJediOrder} from 'react-icons/fa'
import './TrackOrder.css'
import {  UserSelectedOrder } from "../Actions";
import moment from 'moment'
import {AiFillInfoCircle} from 'react-icons/ai'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateINvoice from "../components/CreateInvoice";
import { useHistory } from "react-router";
import Header from '../components/Header';
import EmptyBox from '../static/box.png'

function PopoverList({ onHide }){
    return (
   <IonList>
     <IonListHeader>Terms & Conditions</IonListHeader>
     <IonItem button>Once Order is Placed you Cannot Cancel It</IonItem>
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
    const [time,setTime]=useState('')
    const ordertime = moment(userOrder?.createdAt).format('h:mm a')


    function checkhour(){
        let hour=""
        if(ordertime.includes('pm')){
            for(let i=0;i<ordertime.length;i++){
                if(ordertime[i]===':'){
                    setTime(hour)
                    return hour
                }
                 hour+=ordertime[i]
            }
        }
        setTime(ordertime)
        return ordertime
    }
    useEffect(()=>{
      checkhour()
    },[])
    // checkhour()

    const History=useHistory()

    return(
        <IonPage>
          <Header/>
          <IonContent>
        <>
    {(userOrder.Active===true)?
        <div>
            <div style={{padding:"10px"}}>
                <IonInput placeholder="Search By OrderId" onIonChange={e =>setId(e.detail.value)} className="white-background"/>
                <IonButton style={{color:'white'}} onClick={()=>{
                if(id!=""){
                    dispatch(UserSelectedOrder(id))
                }}}>Submit</IonButton>
                </div>
                <div>
                    <div className="track-body">
                            <div className="track-body-orderid">
                                <h1 className="track-body-orderid-h1">OrderId:-{userOrder?.id}</h1></div>
                        <div style={{padding:"12px",position:"relative",margin:'1rem',width:"90%"}}>
                            <FaJediOrder fontSize={24} className="start-icon"/>
                            <BiPackage fontSize={24} className="packed-icon"/>
                            <FaCarSide fontSize={24} className="depart-icon"/>
                            <TiTick fontSize={24} className="arrive-icon"/>
                    <IonProgressBar value={(userOrder?.status==="created")?0.1:(userOrder?.status==="packed")?0.3:
                    (userOrder?.status==="Dispatched")?0.62:null} color="success"
                    style={{position:'relative'}}>
                        </IonProgressBar><br />
                        <div>
                        <div className="tack-order-dates">
                            <p>OrderPlaced</p>
                            <p style={{fontSize:"0.6rem"}}>
                                {(userOrder?.createdAt)?moment(userOrder?.createdAt).format("MMM Do hh:mm a"):userOrder?.createdAt}
                            </p>
                        </div>
                        <div className="tack-order-dates1">
                            <p>Packed</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br>
                                {time.includes('am')?
                                moment(userOrder?.createdAt).format("MMM Do"):
                                (time<4||time==12)?
                                moment(userOrder?.createdAt).format("MMM Do"):
                                moment(userOrder?.createdAt).add(1,"days").format("MMM Do")}
                                 (2-4)pm
                            </p>
                        </div>
                        <div className="tack-order-dates2">
                            <p>Dispatched</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br>
                                {time.includes('am')?moment(userOrder?.createdAt).format("MMM Do"):
                                (time<4||time==12)?moment(userOrder?.createdAt).format("MMM Do"):
                                moment(userOrder?.createdAt).add(1,"days").format("MMM Do")}
                                 (3-4)pm
                            </p>
                        </div>
                        <div className="tack-order-dates3">
                            <p>Arrived</p>
                            <p style={{fontSize:"0.6rem"}}>
                                expectedAt:<br></br>
                                {time.includes('am')?moment(userOrder?.createdAt).format("MMM Do"):
                                (time<4||time==12)?moment(userOrder?.createdAt).format("MMM Do"):
                                moment(userOrder?.createdAt).add(1,"days").format("MMM Do")}
                                <br></br>
                                 (4-6)pm
                            </p>
                        </div>
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
            </TableBody>
            </Table>
            <div style={{margin:15}}>
            <div>Shipping Charge:{userOrder?.shipping}</div>
            <div>Discount:{userOrder?.discount}</div>
            <div  className="order-box-total">Total:{userOrder?.total}</div>
            </div>
            <div>
            </div>
            </div>
                {userOrder?.customization?.map((data,i)=>
                   <div key={i}>
                   <p className="track-order-custom">{data}</p>
                   </div>
                )}
                        <IonButton color="success" style={{margin:"10px"}}
                        onClick={()=>History.push("/page/Customer%20Service")}>Change Order Delievery date</IonButton>
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
                            <p style={{marginLeft:'10px',backgroundColor:"white"}}>Shipping Address</p>
                        </div>
                        <div className="track-ship-to">
                        <p>Ship to</p>
                            <p>{userOrder?.shippingAddress?.hno}</p>
                            <p>{userOrder?.shippingAddress?.society}</p>
                            <p>{userOrder?.shippingAddress?.pincode}</p>
                        </div>
                    </div>
                    <div style={{margin:"7px"}}>
                    <CreateINvoice/>
                    </div>
                </div>
        </div>:
       <div className="emptybox-div">
       <img className="emptybox-div-img" src={EmptyBox}/>
       </div>}
        </>
        </IonContent>
        </IonPage>
    )
}