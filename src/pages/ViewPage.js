import { IonButton,IonSlide,IonSlides,IonCard ,IonList,IonListHeader,IonItem,IonCardHeader,IonCardContent, useIonPopover,IonIcon, IonImg } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {arrowBackCircle,location } from "ionicons/icons"
import { useSelector ,useDispatch} from "react-redux";
import { Addtocart } from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillInfoCircle} from 'react-icons/ai'
import './ViewPage.css'

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const ImageBar=(data)=>{
  return(
    <IonSlides pager={true} options={slideOpts} style={{height:400,zIndex:0}}>
        {data?.data?.map((img)=>(
    <IonSlide  style={{backgroundColor:"white"}}>
       <img src={img} />
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
        <IonItem button>you could chose any pot of your choice
        we will repot your selected plant into that on your request/permission</IonItem>
        <IonItem button>steps</IonItem>
        <IonItem button>1.)add pot in cart</IonItem>
        <IonItem button>2.)grap and drop your plant inside pot container</IonItem>
        <IonItem button>Congratulation you are all set</IonItem>
      </IonList>)
 }
export default function ViewPage(){
    const dispatch=useDispatch()
    const Item=useSelector((state)=>state.ProductReducer.selectedProduct)
    const Items=useSelector((state)=>state.CartReducer.items)
    const [toggle,settoggle]=useState(true)
    const [toggle1,settoggle1]=useState(false)
    const [toggle2,settoggle2]=useState(false)
    const History=useHistory()
    const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
    const [present1, dismiss1] = useIonPopover(PopOverCustomisation, { onHide: () => dismiss1() });
    const [toggleCustom,settoggleCustom]=useState(false)
    const [toggleCustom1,settoggleCustom1]=useState(false)
    const [toggleCustom2,settoggleCustom2]=useState(false)
    const [toggleCustom3,settoggleCustom3]=useState(false)
    const [toggleCustom4,settoggleCustom4]=useState(false)


    return (
        <div>
           <div onClick={()=>History.goBack()}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
         </div>
            <IonCard style={{marginBottom:'10rem'}}>
                      <IonCardHeader>
                      <h1>{Item?.name} with decorative plastic pot </h1>
                      <ImageBar data={Item?.images}/>
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
                             <p>Recommended Pot Customization</p>
                             <div className="viewpage-Customization">
                                  <div className={(toggleCustom)?"viewpage-custom-box":"viewpage-custom-box1"} onClick={()=>{
                                     settoggleCustom(!toggleCustom)
                                     settoggleCustom1(false)
                                     settoggleCustom2(false)
                                     settoggleCustom3(false)
                                     settoggleCustom4(false)
                                     }}>
                                     <img src={"https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"}/>
                                     <p><BiRupee/>559.00</p>
                                  </div>
                                  <div className={(toggleCustom1)?"viewpage-custom-box":"viewpage-custom-box1"} onClick={()=>{
                                     settoggleCustom(false)
                                     settoggleCustom1(!toggleCustom1)
                                     settoggleCustom2(false)
                                     settoggleCustom3(false)
                                     settoggleCustom4(false)}}>
                                     <img src={"https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=625&q=80"}/>
                                     <p><BiRupee/>600.00</p>
                                  </div>
                                  <div className={(toggleCustom2)?"viewpage-custom-box":"viewpage-custom-box1"} onClick={()=>
                                 {
                                    settoggleCustom(false)
                                    settoggleCustom1(false)
                                    settoggleCustom2(!toggleCustom2)
                                    settoggleCustom3(false)
                                    settoggleCustom4(false)}}>
                                     <img src={"https://images.unsplash.com/photo-1509223197845-458d87318791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"}/>
                                     <p><BiRupee/>559.00</p>
                                  </div>
                                  <div className={(toggleCustom3)?"viewpage-custom-box":"viewpage-custom-box1"} onClick={()=>
                                  {
                                    settoggleCustom(false)
                                    settoggleCustom1(false)
                                    settoggleCustom2(false)
                                    settoggleCustom3(!toggleCustom3)
                                    settoggleCustom4(false)}}>
                                  <img src={"https://images.unsplash.com/photo-1509223197845-458d87318791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"}/>
                                  <p><BiRupee/>559.00</p>
                                  </div>
                                  <div className={(toggleCustom4)?"viewpage-custom-box":"viewpage-custom-box1"} onClick={()=>
                                  {
                                    settoggleCustom(false)
                                    settoggleCustom1(false)
                                    settoggleCustom2(false)
                                    settoggleCustom3(false)
                                    settoggleCustom4(!toggleCustom4)}}>
                                     <img src={"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"}/>
                                     <p><BiRupee/>559.00</p>
                                  </div>
                             </div>
                 <div style={{marginTop:'10px'}}>
                    <h1 style={{fontSize:12}}>Deliver To</h1>
                    <div className="select-location-view"  onClick={()=>History.push("/page/MapsPage")}>
          <IonIcon slot="start"  md={location} style={{color:'#009688'}}/>
              <h1 className="h1-home" style={{color:"white",fontSize:"0.8rem"}}>select your location</h1>
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
                      <div style={{padding:"10px"}}>
                       <h1>*Product Details:</h1>
                       <p>{Item?.type}</p>
                       <p>{Item?.description}</p>
                      </div>:(toggle1)?
                      <div style={{padding:'10px'}}>
                         <h1>Delievery</h1>
                         <p>
                            Gauranteed same day Delievery Services is offered only in
                            Hometown
                         </p>
                      </div>
                      :(toggle2)?
                      <div style={{padding:'10px'}}>
                         {Item?.care}
                      </div>:<h1>dd</h1>
                       }
                    </div>
                    {/* <div>
                       <h1>You May Also Like</h1>
                       <div>

                       </div>
                    </div> */}
               </div>
                  </IonCardContent>
                  </IonCard>
                  <div className="viewpage-buybox">
                  {(Items.find(item => Item?._id === item._id))?
                   <h1 style={{color:"black"}}>Added To Cart</h1>:
                   <IonButton onClick={()=>
                    {dispatch(Addtocart(Item))}}
                     style={{width:'50%',color:"white",height:"50px"}}>
                       Add To Cart
                      </IonButton>}
                     <IonButton style={{width:'50%',color:"white",height:"50px"}}>Buy Now</IonButton>
                  </div>
     </div>
    )
}