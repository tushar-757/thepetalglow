import { IonCard,IonButton,IonContent, IonPage,IonCardContent,useIonToast,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {  useDispatch, useSelector} from 'react-redux';
import {arrowBackCircle } from "ionicons/icons"
import { Addtocart,getIndoorProduct ,addToLikes,removefromLikes,setLoading,setUnLoading} from '../Actions';
import {BiRupee} from 'react-icons/bi'
import Header from '../components/Header';
import {useHistory} from 'react-router-dom'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useState,useEffect } from 'react';
import LoadingBox from '../components/LoadingComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyBox from '../static/box.png'

export default function IndoorPage(){
    const dispatch=useDispatch();
    const History = useHistory();
    const data=useSelector((state)=>state.ProductReducer.Indoor)
//     const Loading=useSelector((state)=>state.ProductReducer.loading)
    const Loading=useSelector((state)=>state.NotificationReducer.Loading)
    const [present, dismiss] = useIonLoading();
    const [setback,setBack]=useState(false)
    const [Data,setData]=useState([])
    const [present1, dismiss1] = useIonToast();
    const [empty,setempty]=useState(false)
  //   const startLoading=()=>{
  //     dispatch(setLoading(true))
  //     setTimeout(()=>{
  //        dispatch(setUnLoading(false))
  //     },[1000])
  // }


  useEffect(()=>{
      if(Array.isArray(data)){
        if(data?.length===0){
          setempty(true)
          present1(
            {
              color: 'warning',
              duration: 100,
              message: `something went wrong:check your connection`
            })
          }else{
              setData(data)
              setempty(false)
            }
      }else{
          present1(
                {
                    color: 'danger',
                    duration: 5000,
                    message: `something went wrong:${data}`
                  })
      }
  },[data])
return(
  <>
  <IonPage>
    <Header/>
    <IonContent>
      {(Loading)?
      <>
      <LoadingBox/>
      </>:
    <div>
           <div style={{position:"relative"}}>
           <div onClick={()=>{
                 History.goBack()
                 setBack(true)
                 present({
                  message: 'Loading...',
                   duration:100
                })
            }} className="back-btn-css">
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"rgb(33, 150, 243)",margin:2}}/>
         </div>
                       <div  className="best-selling-cont">
                       {(empty)?
                        <div className="emptybox-div">
                        <img className="emptybox-div-img" src={EmptyBox}/>
                        </div>
                        :null}
                {Data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item">
                      <IonCardHeader style={{padding:'0px'}}>
                      <LazyLoadImage
                            alt={data?.name}
                            src={data?.images?.[0]}
                            effect="blur"
                            height={150}
                            width="100%"
                          onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:100
                            })
                          dispatch(getIndoorProduct(data._id))
                          History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                           <h1 className="best-selling-tag" style={{background:"#2196f3"}}>{data?.type}</h1>
                          <div className="bestselling-head">
                          <div style={{fontSize:"0.95rem",padding:"0px"}}>{(data?.name?.length>12)?data?.name?.substring(0, 12)+"...":data?.name}</div>
                          <div>|</div>
                          <div  style={{
                                   display: 'flex',
                                   alignItems: 'center'
                             }}>
                                <span style={{margin:"4px"}}>{data?.likes}</span>
                                {(!data?.isLiked)?
                                <AiOutlineHeart style={{fontSize:"24px",color:"#e91e1e"}} onClick={()=>dispatch(addToLikes(data?._id))}/>:
                                <AiFillHeart style={{fontSize:"24px",color:"#e91e1e"}} onClick={()=>dispatch(removefromLikes(data?._id))}/>}
                                </div>
                           </div>
                           <div className="price-box-view">
                          <p style={{alignItems:'center',padding:"0px",fontWeight:"bold",display:'flex'}}><BiRupee/>{data?.price}</p>
                          <p style={{color:"#ff5722",marginLeft:8}}>{(data?.quantity<10&&data?.quantity>0)?
                          `Hurry up only
                           ${data?.quantity} left`:null}</p>
                          </div>
                    </div>
                    <IonCardContent style={{padding:"0px"}}>
                          <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:100
                            })
                          dispatch(getIndoorProduct(data._id))
                          History.push("/page/ViewPage")}}>View</IonButton>
                           {(data?.quantity>0)?<>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 100
                            })
                          dispatch(Addtocart(data))
                         }}>Add To Cart</IonButton>
                          </>:<>Out of Stock</>}
                    </div>
                </IonCardContent>
                  </IonCard>
                )
               ) }
               </div>
               </div>
           </div>}
           </IonContent>
           </IonPage>
           </>
)
}