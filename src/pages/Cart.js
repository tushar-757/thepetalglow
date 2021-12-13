import { IonButton,IonLabel,IonPage,IonContent,IonModal,IonSelect,IonSelectOption,IonIcon,IonItem,useIonLoading,useIonToast,IonCheckbox,IonLoading,IonInput,IonFooter,IonToolbar } from "@ionic/react"
import { addCircle, arrowBackCircle, removeCircle,location,createOutline} from "ionicons/icons"
import { Removefromcart, setQuantity,unsetQuantity,GrandTotal,SetCustomSku
,setBlackPebbles,setBlackWhitePebbles,EditCustomization,setColouredPebble,setWhitePebbles,addtoCustomization, EmptyCart} from '../Actions/CartActions';
import {FetchIndoorProduct,FetchOutdoorProduct,setAddress,FetchPlantersProduct,RemoveUser,FetchSeasonalProduct, FetchSoilFertilzerProduct} from '../Actions/index'
import {AddtoNotification} from '../Actions/index'
import { useDispatch,useSelector } from "react-redux";
import { LocalNotifications } from '@ionic-native/local-notifications'
import {useHistory} from 'react-router-dom'
import { useEffect, useRef,useState } from "react";
import Marquee from "react-fast-marquee";
import './cart.css'
import api from "../Services/urlApi";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CustomziationBox } from "../components/CustomizationBox";
import moment from 'moment';
import { AiFillCopy } from 'react-icons/ai';
import Header from "../components/Header";


const Item=({ index,id,type,textAreaRef,title,sku,copyToClipboard,present,price,image,quantity,orderquantity,dispatch,setValue,skuvalue,customskuvalue })=>{
    return(
            <TableRow key={id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>
                <div style={{display:"flex",position:"relative"}}>
                <div>{sku.substring(0,4)}</div>
                <div style={{width:"35px"}}><textarea className="cart-sku"  ref={el => textAreaRef.current[index] = el} >{sku?.substring(4,7)}</textarea></div>
                <div className="cart-id-copy">
                    <AiFillCopy onClick={(e)=>copyToClipboard(e,index)}  className="cart-id-copy-icon" />
             </div>
                </div></TableCell>
              <TableCell>{<img src={image} className="cart-item-img"/>}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{ <div style={{
    display: 'flex',
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
           <div><h1 style={{margin:'0 8px',fontSize:18,fontWeight:300}}>{orderquantity}</h1></div>
           <div onClick={()=>{
            if(orderquantity===quantity){
              return   present({
                cssClass: 'my-css',
                header: 'Alert',
                message: '!!! NO More Stock Left !!!',
                buttons: [
                  { text: 'Ok', handler: (d) => console.log('ok pressed') },
                ],
                onDidDismiss: (e) => console.log('did dismiss'),
              })
             }
             dispatch(setQuantity(id))}}>
                 <IonIcon md={addCircle} style={{fontSize:24,color:"#4caf50"}}/>
           </div>
         </div>}</TableCell>
         <TableCell>{price}.00</TableCell>
         <TableCell>{orderquantity*price}.00</TableCell>
            </TableRow>
    )
}



export default function Cart(props){
    const Items=useSelector((state)=>state.CartReducer.items)
    const total=useSelector((state)=>state.CartReducer.total)
    const grandtotal=useSelector((state)=>state.CartReducer.grandtotal)
    const customdescription=useSelector((state)=>state?.CartReducer?.customdescription)
    const User=useSelector((state)=>state.UserReducer)
    const [coupon,setCoupon]=useState(0)
    const [couponvalue,setCouponValue]=useState('')
    const [isApplied,setIsApplied]=useState('')
    const [ShippingCharge,setShippingCharge]=useState(0)
    const dispatch=useDispatch()
    const History=useHistory()
    const [loading,setLoading]=useState(false)
    const [skuvalue,setSkuValue]=useState("")
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [currentId,setCurrentid]=useState("")
    const [customarray,setcustomarray]=useState("")
    const [q1,setq1]=useState(1)
    const [q2,setq2]=useState(1)
    const [sku1,setSku1]=useState("")
    const [sku2,setSku2]=useState("")
    const [present, dismiss] = useIonToast();
    const [present2, dismiss2] = useIonLoading();
    const textAreaRef = useRef([]);
    const [copySuccess, setCopySuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [city,setCity]=useState("Faridabad")
    const [hno,setHno]=useState(User?.User?.Address?.hno)
    const [society,setSociety]=useState(User?.User?.Address?.society)
    const [pincode,setPincode]=useState(User?.User?.Address?.pincode)
    const [time,setTime] = useState('')
    const currentdate=new Date().toISOString()
    const ordertime = moment(currentdate).format('h:mm a')
    const [checkedt,setCheckBoxt]=useState(false)
    const user_id=localStorage.getItem('user_id')
    const useraccesstoken=localStorage.getItem('useraccesstoken')

    const ApplyCoupon=async()=>{
      if(total<398){
        return setIsApplied("cart value must be >=399")
      }

      try{
         const response=await api.post("/user/ApplyCoupon",{
          headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
          coupon:couponvalue
         })
         setCoupon(response?.data?.value)
         setIsApplied('Applied Succesfully')
         present(
          {
              color: 'success',
              duration: 2000,
              message: `Applied Succesfully`
            })
      }catch(e){
        setCoupon(0)
        setIsApplied('Coupon is Not Valid')
        present(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${(e?.response?.data?.message)?e?.response?.data?.message:e?.response?.data}`
            })
      }
    }
    // const notificationHandler=(value)=>{
    //   try{
    //     LocalNotifications.schedule({
    //     id:1,
    //     text: value,
    //     icon:"https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__480.jpg"
    //   });
    // }catch(e){
    //     alert(e)
    //   }
    // }

 const createOrder=async()=>{
      try{
          const productids=[]
          Items.map((data)=>{
                const id=data._id
                const quantity=data.orderquantity
                const price=data.price
                const addons=data.addon
                productids.push({id,quantity,addons,price})
        })
        setLoading(true)
        const createorder=await api.post('/createOrder',
        {headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
        total:(grandtotal*100),
        coupon:couponvalue,
        discount:coupon,
        shipping:ShippingCharge,
        products:productids,
        shippingAddress:User?.User?.Address,
        lat:User?.lat,
        lng:User?.lng,
         customization:customdescription?.map((data)=>data.description)})
        setLoading(false)
        present(
          {
              color: 'success',
              duration: 2000,
              message: `Order Created Succesfully`
            })
        localStorage.setItem('razorpayOrderID',createorder?.data?.OrderId)
        localStorage.setItem('ServerorderID',createorder?.data?.id)
        // notificationHandler(`your order with OrderId${createorder?.data?.id} is created succesfully go for payment now`)
        dispatch(AddtoNotification(createorder.data))
        dispatch(EmptyCart())
        dispatch(FetchSeasonalProduct())
        dispatch(FetchIndoorProduct())
        dispatch(FetchOutdoorProduct())
        dispatch(FetchPlantersProduct())
        dispatch(FetchSoilFertilzerProduct())
        History.push("/page/PaymentGateway")
      }catch(e){
        if(e?.response?.data?.message==="invalid token/you must be an authorize user to access it"){
          dispatch(EmptyCart())
          dispatch(RemoveUser())
          localStorage.removeItem('user');
          localStorage.removeItem('user_id');
          localStorage.removeItem('useraccesstoken');
          localStorage.removeItem('orderID');
        }
        present(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${e?.response?.data?.message}`
            })
      }
   }

    const ProceedToCheckout=async()=>{
     try{
       if(User?.lat===0 && User?.lng===0){
         return  present({
          color: 'danger',
              duration: 5000,
          message: 'Please Set Your Location!!'
        })
       }
       if(customdescription?.length>0){
          if(!checkedt){
            return present({
              color: 'danger',
                  duration: 5000,
              message: 'please confirm your customization terms and conditions'
            })
       }
      }
        if(User.User.username===''){
        History.push('/page/Login')
        }else{
         if(total!=0 && User?.lat!=0 && User?.lng!=0){
           setLoading(true)
           await createOrder()
           setLoading(false)
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
const SubmitLocation=(e)=>{
  e.preventDefault()
  dispatch(setAddress(hno,society,pincode))
  setShowModal(false)
}

// useEffect(()=>{
//   if(total<398){
//     setCoupon(0)
//      setIsApplied("cart value must be >=399")
//   }
// },[total])

useEffect(()=>{
  if(total<499&&total>0){
     setShippingCharge(79)
     dispatch(GrandTotal(total+ShippingCharge-coupon))
  }else{
    setShippingCharge(0)
    dispatch(GrandTotal(total+ShippingCharge-coupon))
  }
},[total,ShippingCharge,coupon])

const customArrayHandler=(e)=>{
  e.preventDefault()
  dispatch(addtoCustomization(customarray))

}
const customArrayEditHandler=(e,id)=>{
  e.preventDefault()
  dispatch(EditCustomization(customarray,id))
}
useEffect(()=>{
  const customvaluetext=()=>{
      return `i want my ${q1} TPG_${sku1} plant inside ${q2} TPG_${sku2} pot`
     }
  const text=customvaluetext()
  setcustomarray(text)
},[customarray,q1,q2,sku1,sku2])
const setcustomto0=()=>{
  setcustomarray([])
}
function copyToClipboard(e,i) {
  navigator.clipboard.writeText(textAreaRef.current[i].value)
  e.target.focus();
  setCopySuccess('Copied!');
  present(
    {
        color: 'success',
        duration: 2000,
        message: `copied`
      })
};
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
const options = {
  cssClass: 'my-custom-interface'
};
    return(
      <>
      <IonPage>
        <Header/>
        <IonContent>
        <div className="white-background">
        <Marquee className="top-message" speed={40} gradient={false}>
          shipping is free for orders having cart value greater than 499,use coupon HAPPYPLANT100 for 20% OFF upto Rs.100
       </Marquee>
        <div onClick={()=>{
           present2({
            message: 'Loading...',
             duration:1000
          })
          History.goBack()
          }}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"#eb445a",margin:5}}/>
        </div>
        <div>
         <h1 style={{fontSize:20,padding:'0 18px'}}>SubTotal:{total}</h1>
        </div>
        </div>
            <div style={{overflowX:"auto"}} className="white-background">
            <IonModal isOpen={showModal} cssClass='my-custom-class' backdropDismiss={false}>
                    <form onSubmit={(e)=>SubmitLocation(e)}>
                             <IonInput placeholder="enter hno./flat no. here.." value={hno} onIonChange={(e)=>setHno(e.detail.value)} style={{marginBottom:"5px"}} required/>
                             <IonInput placeholder="enter Society/Sector here.." value={society} onIonChange={(e)=>setSociety(e.detail.value)} style={{marginBottom:"5px"}} required/>
                             <IonInput placeholder="enter Pincode no." value={pincode} onIonChange={(e)=>setPincode(e.detail.value)} style={{marginBottom:"5px"}} required/>
                             <IonSelect interface="popover" interfaceOptions={options}
                             placeholder="Select City" value={city}
                             onIonChange={(e)=>setCity(e.detail.value)} required>
                                      <IonSelectOption value="Faridabad" class="brown-option">Faridabad</IonSelectOption>
                                      <IonSelectOption value="Gurugram" disabled={true}>Gurugram  coming soon...</IonSelectOption>
                                      <IonSelectOption value="Delhi" disabled={true}>Delhi coming soon...</IonSelectOption>
                                      <IonSelectOption value="Noida" disabled={true}>Noida coming soon...</IonSelectOption>
                                      <IonSelectOption value="Palwal" disabled={true}>Palwal coming soon...</IonSelectOption>
                             </IonSelect>
                            <IonButton type="submit" style={{color:"white"}}>Update</IonButton>
                            <IonButton onClick={()=>setShowModal(false)} style={{color:"white"}}>Close</IonButton>
                            </form>
               </IonModal>
            <Table size="small">
        <TableHead>
          <TableRow>
               <TableCell>S.NO.</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>IMAGE</TableCell>
            <TableCell>PRODUCT</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                {
                    Items.map((item,i)=>(
                        <>
                        <Item key={i} index={i} type={item?.type}  textAreaRef={textAreaRef} present={present} id={item._id} sku={item.SKU} skuvalue={skuvalue} setValue={setSkuValue}
                         customskuvalue={item?.customskuvalue} copyToClipboard={copyToClipboard} type={item.type} title={item.name} price={item.price} image={item.images?.[0]}
                        orderquantity={item?.orderquantity}
                        quantity={item?.quantity}
                        dispatch={dispatch} />
                        {(item.type==="Indoor"||item.type==="Indoor "||item.type==="Outdoor"||item.type==="Outdoor "||item.type==="Indoor/Outdoor")?
                        <TableRow>
                          <TableCell>
                          <div>Add On's</div>
                            <IonCheckbox style={{color:"white"}} checked={item?.customskuvalue} onIonChange={(e)=>{
                             setChecked1(e.detail.checked)
                             }}
                             onClick={()=>{
                               setCurrentid(item._id)
                              dispatch(SetCustomSku(item._id,!item.customskuvalue))
                             }}
                             />
                             </TableCell>
                               <TableCell>{(item?.addon[0]?.whitepebbles?.isAdded)?<>whitepebbles</>:null}</TableCell>
                               <TableCell>{(item?.addon[1]?.blackpebbles?.isAdded)?<>blackpebbles</>:null}</TableCell>
                               <TableCell>{(item?.addon[2]?.BlackWhitepebbles?.isAdded)?<>BlackWhitepebbles</>:null}</TableCell>
                               <TableCell>{(item?.addon[3]?.colouredpebbles?.isAdded)?<>colouredpebbles</>:null}</TableCell>
                               <TableCell>{(item?.addon?.whiteplate?.isAdded)?<>whiteplate</>:null}</TableCell>
                               <TableCell>{(item?.addon?.redplate?.isAdded)?<>redplate</>:null}</TableCell>
                        </TableRow>:null}
                        {(item.customskuvalue)?
                         <TableRow>
                               <TableCell>
                                 <p className="customaddonitem">white Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[0]?.whitepebbles?.isAdded} onClick={()=>{
                                dispatch(setWhitePebbles(item?._id,!item?.addon[0]?.whitepebbles?.isAdded))
                             }} />
                                </TableCell>
                               <TableCell>
                                 <p className="customaddonitem">Black Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[1]?.blackpebbles?.isAdded} onClick={()=>{
                                   console.log("inside black pebble")
                             dispatch(setBlackPebbles(item?._id,!item?.addon[1]?.blackpebbles?.isAdded))
                             }} />
                                </TableCell>

                               <TableCell>
                                 <p className="customaddonitem">Black and White Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[2]?.BlackWhitepebbles?.isAdded} onClick={()=>{
                             dispatch(setBlackWhitePebbles(item?._id,!item?.addon[2]?.BlackWhitepebbles?.isAdded))
                             }} />
                                </TableCell>

                                <TableCell>
                                 <p className="customaddonitem">Coloured Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[3]?.colouredpebbles?.isAdded} onClick={()=>{
                             dispatch(setColouredPebble(item?._id,!item?.addon[3]?.colouredpebbles?.isAdded))
                             }} />
                                </TableCell>
                           </TableRow>
                         :null}
                         </>
                    ))
                }
             </TableBody>
        </Table>
        </div>
        <div style={{margin:"0.5rem"}} className="white-background">
          <IonItem>
            <IonLabel className="white-background">I want Customization</IonLabel>
            <IonCheckbox style={{color:"white"}} checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
          </IonItem>
          {(checked)?
          <>
            <CustomziationBox customarray={customarray}
            dispatch={dispatch}
             customArrayHandler={customArrayHandler}
             setcustomto0={setcustomto0}
             setq1={setq1}
             setq2={setq2}
             setSku1={setSku1}
             setSku2={setSku2}
             customArrayEditHandler={customArrayEditHandler}
             addtoCustomization={addtoCustomization}
             checked={checkedt}
             setCheckBox={setCheckBoxt}
             />
          </>
          :null}
        </div>
             <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={15000}
        message={'Please wait...'}
      />
                 <div className="coupon-code">
                   <div>
                 <h1 className="couponcodeh1">coupon code</h1>
                     </div>
                 <IonInput className="couponinput"
                 onIonChange={e =>setCouponValue(e.detail.value)} placeholder="Enter Coupon Code" />
                 <IonButton style={{color:"white",fontSize:'0.8rem'}}
                 onClick={()=>ApplyCoupon()}>Apply Coupon</IonButton>
                 <h1 className={(isApplied==='Applied Succesfully')?"coupon-code-h1":'coupon-code-h2'} >{isApplied}</h1>
                 </div>
                 <div style={{margin:16}}>
                 {time.includes('am')?
                        <>
                        <div className="GetBox">
                          <h1 className="GetItBy">Get it by Today {moment(currentdate).format("MMM Do")}</h1>
                        </div>
                        </>
                         :
                         <>
                        {(time>=4&&time<12)?
                        <div className="GetBox">
                          <h1 className="GetItBy">Get it by Tomorrow { moment(currentdate).add(1,"days").format("MMM Do")}</h1>
                        </div>:
                        <div className="GetBox">
                        <h1  className="GetItBy">Get it by Today {moment(currentdate).format("MMM Do")}</h1>
                      </div>
                        }
                        </>
                     }
                 </div>
                 <div className="select-location-div">
                    <h1 style={{fontSize:12}}>Deliver To</h1>
                    <div className="select-location-view-cart"  onClick={()=>History.push("/page/MapsPage")}>
                          <IonIcon slot="start"  md={location} style={{color:'blue'}}/>
                      <h1 className="h1-home location-color" style={{color:"black",fontSize:"0.8rem"}}>
                      select your location
                      </h1>
                    </div>
                 </div>
                 <div style={{position:"relative"}} className="select-location-view-cart select-location-div" >
                   <span>{User?.User?.Address?.hno}</span>,
                   <span>{User?.User?.Address?.society}</span>,
                   <span>{User?.User?.Address?.pincode}</span>
                   <span style={{position:"absolute",left:"80%"}} onClick={()=>setShowModal(true)}>
                     <IonIcon md={createOutline} style={{fontSize:24}}/>
                   </span>
                 </div>
                 <div className="total-bar">
                     <div>
                         <div className="total-bar-item">
                         <h1>Sub Total</h1>
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
                         <h1>(ALL TAXES ARE INCLUSIVE)</h1>
                         </div>
                     </div>
                     <div>
                       <div className="total-bar-item">
                         <h1>Shipping</h1>
                         <h1>{ShippingCharge}</h1>
                         </div>
                     </div>
                     <div>
                     <div className="total-bar-item">
                         <h1>Grand Total</h1>
                         <h1>{grandtotal}</h1>
                         </div>
                     </div>
                 </div>
                 </IonContent>
                 <IonFooter>
      <IonToolbar style={{padding: "14px"}}>
        {
      (true)?
          <IonButton color="tertiary"
          onClick={()=>ProceedToCheckout()}>
          CHECKOUT
        </IonButton>:
        <IonButton color="danger">
          sorry currently unavailable
          </IonButton>
        }
      </IonToolbar>
    </IonFooter>
    </IonPage>
           </>
    )
}



