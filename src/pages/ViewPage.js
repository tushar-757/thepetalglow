import { IonButton,IonPage,IonContent,IonSlide,IonSlides,IonCard,useIonToast ,useIonLoading,IonList,IonListHeader,IonItem,useIonAlert,IonCardHeader,IonCardContent, useIonPopover,IonIcon, IonImg } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {arrowBackCircle,location } from "ionicons/icons"
import { useSelector ,useDispatch} from "react-redux";
import { Addtocart,ADD_TO_WISHLIST,setReview } from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillInfoCircle, AiOutlineUser} from 'react-icons/ai'
import { FaCartArrowDown ,FaStar} from 'react-icons/fa';
import './ViewPage.css'
import TPGLOGO from '../static/TPGLOGO.png';
import ReactStars from 'react-stars'
import { CustomerRating } from '../components/CustomerRating';
import api from '../Services/urlApi';
import moment from 'moment';
import Header from '../components/Header';

const slideOpts = {
  initialSlide:0,
  speed:200,
};
const ImageBar=(data)=>{
   return(
      <IonSlides pager={true} options={slideOpts} style={{height:290,zIndex:0}}>
        {data?.data?.map((img,i)=>(
         <IonSlide  style={{backgroundColor:"white"}} key={i}>
            <img src={(img!=null)?img:TPGLOGO} className="view-page-img" />
         </IonSlide>
))}
</IonSlides>
  )}
  function PopoverList({ onHide }){
    return (
   <IonList>
     <IonListHeader>Price Details</IonListHeader>
     <IonItem button>Maximun Retail Price</IonItem>
     <IonItem button>(inclusive all taxes)</IonItem>
   </IonList>
 )}
 function PopOverCustomisation({onHide}){
   return (
      <IonList>
        <IonListHeader>On Request Customization</IonListHeader>
        <IonItem button>you could choose either our pot customization or
        any pot of your choice we will repot your selected plant into that on your request/permission</IonItem>
        <IonItem button>steps</IonItem>
        <IonItem button>1.)add your selected plant in cart</IonItem>
        <IonItem button>2.)add your selected planter in cart</IonItem>
        <IonItem button>3.)Choose i want customization</IonItem>
        <IonItem button>4.)fill in required form</IonItem>
        <IonItem button>Congratulation you are all set</IonItem>
      </IonList>)
 }



export default function ViewPage(){
   const [presentalert] = useIonAlert();
    const dispatch=useDispatch()
    const Item=useSelector((state)=>state.ProductReducer.selectedProduct)
    const Items=useSelector((state)=>state.CartReducer.items)
    const [toggle,settoggle]=useState(true)
    const [toggle1,settoggle1]=useState(false)
    const [toggle2,settoggle2]=useState(false)
    const [description,setDescription]=useState("")
    const History=useHistory()
    const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
    const [present1, dismiss1] = useIonPopover(PopOverCustomisation, { onHide: () => dismiss1() });
    const user_id=localStorage.getItem('user_id')
    const useraccesstoken=localStorage.getItem('useraccesstoken')
    const [rating,setRating]=useState(5)
    const [present2, dismiss2] = useIonLoading();
    const [present3, dismiss3] = useIonToast();
   const [time,setTime] = useState('')
    const currentdate=new Date().toISOString()
    const ordertime = moment(currentdate).format('h:mm a')

   //   const customdata=useSelector((state)=>state.ProductReducer..Customizations)

   const ratingChanged = (newRating) => {
     setRating(newRating)
    }
    const submitHandler=async(e)=>{
       e.preventDefault();
       try{
          const item={};
         //  const itemobject=item.toObject()
          if(Item.context.includes("Indoor")){
            item.indoorid=Item?._id
          }
          if(Item.context.includes("Outdoor")){
            item.outdoorid=Item?._id
          }
          if(Item.context.includes("Planter")){
            item.Planterid=Item?._id
          }
          if(Item.context.includes("Succulent")){
            item.succulentid=Item?._id
          }
          if(Item.context.includes("Seasonal")){
            item.seasonalid=Item?._id
          }
          if(Item.context.includes("Soil")){
            item.soilid=Item?._id
          }
          const data=await api.post("/userreview",{headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
         rating,description,item})
         setDescription("")
         presentalert({
            cssClass: 'my-css',
            header: 'Alert',
            message: 'submitted succesfully,wait for the approval once its approved it will be on the site',
            buttons: [
              { text: 'Ok', handler: (d) => console.log('ok pressed') },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
          })
       }catch(e){
           alert("something is not right")
       }
    }
    const AddToWishList=()=>{
         dispatch(ADD_TO_WISHLIST(Item))
         present3(
            {
                color: 'secondary',
                duration: 2000,
                message: `Item added to WishList`
              })
    }
    useEffect(()=>{
         dispatch(setReview(Item?.reviews))
         if(Item?.name===undefined){
            History.push("/page/ThePetalGlow")
         }
      },[])
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
    return (
      <>
      <IonPage>
        <Header/>
        <IonContent>
      <>
        <div style={{position:"relative"}}>
           <div onClick={()=>{
              History.goBack()
              present2({
                message: 'Loading...',
                 duration:100
              })
           }} className="back-btn-css">
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"#2196f3",margin:5}}/>
         </div>
         <div className="animate__animated animate__slideInUp">
            <IonCard style={{marginBottom:'1rem',marginTop:"5rem",padding:"10px"}} className="white-background">
                      <IonCardHeader>
                         <div>
                            {Item.type}
                            </div>
                         <div className="viewpage-typevalue">
                             {Item?.type}
                            </div>
                      <h1 style={{marginTop:0,fontSize:"1.5rem",fontFamily:"fantasy"}}>{Item?.name}</h1>
                      <ImageBar data={Item?.images} />
                      </IonCardHeader>
                    <div>
                    </div>
                    <IonCardContent>
                          {/* <h1 style={{fontSize:18}}>{Item[0]?.name} with Decorative Plastic pot</h1> */}
                          <h1 style={{fontSize:24,color: '#ef0404'}}>
                             <BiRupee/>{Item?.price}.00<AiFillInfoCircle style={{color:"grey"}}

                             onClick={(e) =>
                               present({
                                 event: e.nativeEvent,
                               })
                             }/></h1>
                             <h1 style={{fontSize:14,}}>Customization<AiFillInfoCircle style={{color:"grey"}}
                             onClick={(e) =>
                               present1({
                                 event: e.nativeEvent,
                               })
                             }/></h1>
                             <p>Our Recommended Pot Customization</p>
                           {(Item?.Customizations?.length>0)?
                             <div className="viewpage-Customization">
                                {Item?.Customizations?.map((data,i)=>
                                   <div className="viewpage-customization-box" key={data?._id}>
                                      <img alt={data?.name} src={data?.images[0]} style={{width:"90%",height:"65%"}}/>
                                      <p>{(data?.name?.length>20)?data?.name?.substring(0,20)+"...":data?.name}</p>
                                      <div style={{display:"flex"}}>
                                      <div style={{width:"70%"}}><BiRupee/>{data?.price}</div>
                                      {(data?.quantity>0)?
                                      (Items.find(item => data?._id === item._id))?
                                         <h1 style={{color:"black",fontSize:"12px"}}>Added To Cart</h1>:
                                         <div style={{width:"30%"}} onClick={()=>dispatch(Addtocart(data))}>
                                         <FaCartArrowDown style={{fontSize:"18px"}}/>
                                         </div>
                                         :<>Out of Stock</>}
                                      </div>
                                   </div>
                                )}
                             </div>:<div>nothing to show currently</div>}
                       {time.includes('am')?
                        <>
                        <div  className="GetBox1">
                          <div className="GetItBy1">Get it by Today {moment(currentdate).format("MMM Do")}</div>
                        </div>
                        </>
                         :
                         <>
                        {(time>=4&&time<12)?
                        <div  className="GetBox1">
                          <div className="GetItBy1">Get it by Tomorrow { moment(currentdate).add(1,"days").format("MMM Do")}</div>
                        </div>:
                        <div  className="GetBox1">
                        <div className="GetItBy1">Get it by Today {moment(currentdate).format("MMM Do")}</div>
                      </div>
                        }
                        </>
                     }
                 <div style={{marginTop:'10px'}}>
                    <h1 style={{fontSize:12}}>Deliver To</h1>
                    <div className="select-location-view"  onClick={()=>History.push("/page/MapsPage")}>
          <IonIcon slot="start"  md={location} style={{color:'blue'}}/>
              <h1 className="h1-home" style={{color:"black",fontSize:"0.8rem"}}>select your location</h1>
          </div>
                    </div>
               <div>
                    <div className="descipt-box">
                       <div className={(toggle)?'desc-box-cont-selected':'desc-box-cont'}
                       onClick={()=>{
                          settoggle(true)
                          settoggle1(false)
                          settoggle2(false)}}>
                           <h1>Description</h1>
                       </div>
                       <div className={(toggle1)?'desc-box-cont-selected':'desc-box-cont'}
                        onClick={()=>{settoggle1(true)
                        settoggle(false)
                        settoggle2(false)}}>
                           <h1>Delivery Info</h1>
                       </div>
                       <div className={(toggle2)?'desc-box-cont-selected':'desc-box-cont'}
                        onClick={()=>{settoggle2(true)
                        settoggle1(false)
                        settoggle(false)}}>
                           <h1>Care</h1>
                       </div>
                    </div>
                    <div>
                       {(toggle)?
                      <div style={{padding:"10px",fontSize:"0.8rem"}}>
                       <h1>Product Details:</h1>
                       <p>TYPE:-{Item?.type}</p>
                       <p style={{fontSize:"0.8rem"}} dangerouslySetInnerHTML={{__html: Item?.description}}/>
                      </div>:(toggle1)?
                      <div style={{padding:'10px',fontSize:"0.8rem"}}>
                         <h1>Delivery</h1>
                         <p style={{fontSize:"0.8rem"}}>
                            Same day Delivery Services is offered only in
                            Hometown(Faridabad).Make sure you have ordered before 4pm otherwise your order would count in next day delievery
                         </p>
                      </div>
                      :(toggle2)?
                      <div style={{padding:'10px',fontSize:"0.8rem"}}>
                         <p dangerouslySetInnerHTML={{__html: Item?.care}} />
                      </div>:<h1>dd</h1>
                       }
                    </div>
               </div>
                  </IonCardContent>
                  </IonCard>
                  <IonCard style={{marginBottom:'1rem'}} className="white-background" >
                        <IonCardHeader>
                           <h4>Customer Reviews</h4>
                        </IonCardHeader>
                           <div className="viewpage-review-box">
                              {(Item?.reviews?.length>0)?
                              <>
                             {Item?.reviews?.map((data,i)=>
                                   <div className="review-box-cont" key={data?._id}>
                                   <div><AiOutlineUser className="review-user"/></div>
                                   <div className="review-box-star">{data?.stars}<FaStar style={{color:"orange"}}/></div>
                                   <div className="review-box-cont-desc">
                                     <p>"{data?.description}"</p>
                                   </div>
                                   <div className="review-box-username">
                                      <p>~{data?.username}</p>
                                      </div>
                                   </div>
                             )}</>:<div className="noreview-box">No reviews To Show</div>}
                             </div>
                   </IonCard>
                  <IonCard style={{marginBottom:'1rem'}} className="white-background" >
                  <IonCardContent>
                            <div>
                            <CustomerRating review={Item?.reviews}/>
                            </div>
                        </IonCardContent>
                   </IonCard>
                   <IonCard className="write-review-box white-background" >
                        <IonCardHeader>
                           <h4 style={{marginBottom:"5px"}}>Write a review</h4>
                           <form onSubmit={(e)=>submitHandler(e)}>
                           <div  style={{marginBottom:"5px"}}>
                           <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              value={rating}
                              size={30}
                              color2={'orange'}
                              required={true}/>
                              </div>
                           <div style={{marginBottom:"5px"}}>
                              <textarea rows={8} cols={40}
                              style={{border: 'none',
                                 background: '#3a3a3a',
                                 boder:"none",
                                 borderRadius:"5px",
                                 color: 'white'}}
                                 value={description}
                                 onChange={(e)=>setDescription(e.target.value)}
                               placeholder="write your review..." required/></div>
                           <IonButton color="secondary" type="submit">Submit</IonButton>
                           </form>
                        </IonCardHeader>
                   </IonCard>
                   </div>
                  <div className="viewpage-buybox">
                  {(Items.find(item => Item?._id === item._id))?
                   <h1 style={{color:"black",
                   display:'flex',
                   width: '50%',
                   justifyContent: 'center',
                   alignItems: 'center',
                   fontSize: '0.8rem'}}>Added To Cart</h1>:

                     (Item?.quantity>0)?<IonButton
                     color="tertiary"
                     onClick={()=>{
                        dispatch(Addtocart(Item))
                        present3(
                           {
                               color: 'secondary',
                               duration: 2000,
                               message: `Item added to cart`
                             })}}
                             className="AddCartbtnstyle"
                            >
                              Add To Cart
                      </IonButton>:<div className="viewpage-outofstock"><p>Out of Stock</p></div>

                      }
                     <IonButton color="light"
                      style={{width:'50%',color:"white",height:"50px"}}
                      onClick={()=>AddToWishList()}>
                         Add To WishList</IonButton>
                  </div>
     </div>
     </>
     </IonContent>
     </IonPage>
     </>
    )
}