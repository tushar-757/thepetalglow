import { IonButton,IonLabel, IonIcon,IonItem,IonChip,IonList,IonCheckbox,IonListHeader, useIonAlert ,IonLoading,IonInput,useIonPopover,IonFooter,IonToolbar } from "@ionic/react"
import { addCircle, arrowBackCircle, removeCircle } from "ionicons/icons"
import { Removefromcart, setQuantity,unsetQuantity,GrandTotal
  ,addAddonItemsToCartItem, AddtoNotification, SetCustomSku
,setBlackPebbles,setBlackWhitePebbles,setColouredPebble,setWhitePebbles,addtoCustomization, EmptyCart,FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct, removeAddonItemsToCartItem} from '../Actions';
import { useDispatch,useSelector } from "react-redux";
import { LocalNotifications } from '@ionic-native/local-notifications'
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from "react";
import './cart.css'
import api from "../Services/urlApi";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CustomziationBox } from "../components/CustomizationBox";




const Item=({ index,id,title,sku,present,price,image,quantity,orderquantity,dispatch,setValue,skuvalue,customskuvalue })=>{
    return(
            <TableRow key={id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{sku}</TableCell>
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

const CustomAddonAddRemove=({i,name,id,dispatch,quantity,type})=>{
  return (
    <TableCell>{ <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '45px'
  }}>
    <div>
      <p className="customaddonitem">{name}</p>
      <p className="customaddonitem">price:29</p>
      </div>
             <div style={{backgroundColor:"white"}}  style={{backgroundColor:"white"}}>
                  <IonIcon md={removeCircle} style={{fontSize:24,color:"#ff00009e"}}
                onClick={()=>{
                    dispatch(removeAddonItemsToCartItem(id,type))
                }}
                  />
              </div>
             <div><h1 style={{margin:'0 8px',fontSize:18,fontWeight:300}}>{quantity}</h1></div>
             <div>
                   <IonIcon md={addCircle} style={{fontSize:24,color:"#4caf50"}} onClick={()=>{
                    dispatch(addAddonItemsToCartItem(id,type))
                   }}/>
             </div>
           </div>}</TableCell>
  )
}

export default function Cart(props){
    const Items=useSelector((state)=>state.CartReducer.items)
    const [present] = useIonAlert();
    const total=useSelector((state)=>state.CartReducer.total)
    const grandtotal=useSelector((state)=>state.CartReducer.grandtotal)
    const customdescription=useSelector((state)=>state.CartReducer.customdescription)
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
    const [customarray,setcustomarray]=useState([])
    const [q1,setq1]=useState(1)
    const [q2,setq2]=useState(1)
    const [sku1,setSku1]=useState("")
    const [sku2,setSku2]=useState("")


    const ApplyCoupon=()=>{
      if(total<398){
        return setIsApplied("cart value must be >=399")
      }
       if(couponvalue==="HAPPYPLANT30"||couponvalue==='PLANTGIENENEW'&&total!=0){
            setCoupon(100)
            setIsApplied('Applied Succesfully')
       }else{
        setCoupon(0)
        setIsApplied('Coupon is Not Valid')
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
      try{
          const productids=[]
          Items.map((data)=>{
                const id=data._id
                const quantity=data.orderquantity
                const addons=data.addon
                productids.push({id,quantity,addons})
        })
        setLoading(true)
        const user_id=localStorage.getItem('user_id')
        const useraccesstoken=localStorage.getItem('useraccesstoken')
        const createorder=await api.post('/createOrder',
        {headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
        total:(total*100),
        products:productids,
        shippingAddress:User?.User?.Address,
        lat:User?.lat,
        lng:User?.lng,
         customization:customdescription})
        setLoading(false)
        localStorage.setItem('razorpayOrderID',createorder?.data?.OrderId)
        localStorage.setItem('ServerorderID',createorder?.data?.id)
        notificationHandler(`your order with OrderId${createorder?.data?.id} is created succesfully go for payment now`)
        dispatch(AddtoNotification(createorder.data))
        dispatch(EmptyCart())
        dispatch(FetchSeasonalProduct())
        dispatch(FetchIndoorProduct())
        dispatch(FetchOutdoorProduct())
        dispatch(FetchPlantersProduct())
      }catch(e){
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

useEffect(()=>{
  if(couponvalue==="HAPPYPLANT30"||couponvalue==='PLANTGIENENEW'&&total!=0){
          dispatch(GrandTotal(total-coupon+ShippingCharge))
          // setIsApplied('Applied Succesfully')
   }else{
    dispatch(GrandTotal(total+ShippingCharge))
    // setIsApplied('Coupon is Not Valid')
  }
},[coupon,ShippingCharge])

useEffect(()=>{
  if(total<499&&total>0){
     setShippingCharge(49)
     dispatch(GrandTotal(total+ShippingCharge))
  }else{
    setShippingCharge(0)
    dispatch(GrandTotal(total+ShippingCharge))
  }
},[total])

 const customvaluetext=()=>{
     return `i want my ${q1} TPG_${sku1} plant inside TPG_${q2} ${sku2} pot`
    }
const customArrayHandler=(e)=>{
e.preventDefault()
  const text=customvaluetext()
  setcustomarray([...customarray,text])
}

    return(
          <>
        <div>
        <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
        </div>
        <div>
         <h1 style={{fontSize:20,padding:'0 18px'}}>SubTotal:{grandtotal}</h1>
        </div>
        </div>
            <div style={{overflowX:"auto"}}>
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
                        <Item key={i} index={i} present={present} id={item._id} sku={item.SKU} skuvalue={skuvalue} setValue={setSkuValue}
                         customskuvalue={item?.customskuvalue} type={item.type} title={item.name} price={item.price} image={item.images?.[0]}
                        orderquantity={item?.orderquantity}
                        quantity={item?.quantity}
                        dispatch={dispatch} />
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
                        </TableRow>
                        {(item.customskuvalue)?
                         <TableRow>
                              {(!item?.addon[0]?.whitepebbles?.isAdded)? <TableCell>
                                 <p className="customaddonitem">white Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[0]?.whitepebbles?.isAdded} onClick={()=>{
                             dispatch(setWhitePebbles(item?._id,!item?.addon[0]?.whitepebbles?.isAdded))
                             }} />
                                </TableCell>:
                                 <CustomAddonAddRemove name={'white Pebbles'} type={"whitepebble"} id={item?._id} dispatch={dispatch} quantity={item?.addon[0]?.whitepebbles?.quantity}/> }
                               {(!item?.addon[1]?.blackpebbles?.isAdded)?
                               <TableCell>
                                 <p className="customaddonitem">Black Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[1]?.blackpebbles?.isAdded} onClick={()=>{
                                   console.log("inside black pebble")
                             dispatch(setBlackPebbles(item?._id,!item?.addon[1]?.blackpebbles?.isAdded))
                             }} />
                                </TableCell>:<CustomAddonAddRemove name={'Black Pebbles'} type={'blackpebbles'} dispatch={dispatch}  id={item?._id} quantity={item?.addon[1]?.blackpebbles?.quantity}/>}
                                {(!item?.addon[2]?.BlackWhitepebbles?.isAdded)?
                               <TableCell>
                                 <p className="customaddonitem">Black and White Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[2]?.BlackWhitepebbles?.isAdded} onClick={()=>{
                             dispatch(setBlackWhitePebbles(item?._id,!item?.addon[2]?.BlackWhitepebbles?.isAdded))
                             }} />
                                </TableCell>:<CustomAddonAddRemove name={"Black&White Pebbles"} dispatch={dispatch}  type={'baclandwhitepebble'}id={item._id} quantity={item?.addon[2]?.BlackWhitepebbles?.quantity}/>}

                                {(!item?.addon[3]?.colouredpebbles?.isAdded)?<TableCell>
                                 <p className="customaddonitem">Coloured Pebbles</p>
                                 <p className="customaddonitem">price:29</p>
                                 <IonCheckbox style={{color:"white"}} checked={item?.addon[3]?.colouredpebbles?.isAdded} onClick={()=>{
                             dispatch(setColouredPebble(item?._id,!item?.addon[3]?.colouredpebbles?.isAdded))
                             }} />
                                </TableCell>:<CustomAddonAddRemove name={"coloured pebbles"}  dispatch={dispatch}  type={'colouredpebbles'} id={item._id} quantity={item?.addon[3]?.colouredpebbles?.quantity}/>}
                           </TableRow>
                         :null}
                         </>
                    ))
                }
             </TableBody>
        </Table>
        </div>
        <div style={{margin:"0.5rem"}}>
          <IonItem>
            <IonLabel>I want Customization</IonLabel>
            <IonCheckbox style={{color:"white"}} checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
          </IonItem>
          {(checked)?
          <>
            <CustomziationBox customarray={customarray}
            dispatch={dispatch}
             customArrayHandler={customArrayHandler}
             setq1={setq1}
             setq2={setq2}
             setSku1={setSku1}
             setSku2={setSku2}
             addtoCustomization={addtoCustomization}
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
                 <IonFooter>
      <IonToolbar style={{padding: "14px"}}>
          <IonButton color="tertiary"
          onClick={()=>ProceedToCheckout()}>
          CHECKOUT
        </IonButton>
      </IonToolbar>
    </IonFooter>
           </>
    )
}



