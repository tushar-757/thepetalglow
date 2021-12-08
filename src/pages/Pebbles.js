import { IonCard,IonButton,IonCardContent,useIonToast,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {arrowBackCircle } from "ionicons/icons"
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart,GetSelectedPebble,addToLikes,removefromLikes } from '../Actions';
import {BiRupee} from 'react-icons/bi'
import {useHistory} from 'react-router-dom'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useState,useEffect} from 'react';
import LoadingBox from '../components/LoadingComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Pebbles(){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const Loading=useSelector((state)=>state.ProductReducer.loading)
    const data=useSelector((state)=>state.ProductReducer.Pebbles)
    const [Data,setData]=useState([])
    const [present1, dismiss1] = useIonToast();

    useEffect(()=>{
          console.log(data)
        if(Array.isArray(data)){
              setData(data)
              if(data?.length===0){
                  present1(
                        {
                            color: 'danger',
                            duration: 5000,
                            message: `something went wrong:check your connection`
                          })
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
      (Loading)?
      <>
      <LoadingBox/>
      </>:
    <div>
           <div style={{position:"relative"}}>
           <div onClick={()=>{
                 History.goBack()
                 present({
                  message: 'Loading...',
                   duration:1000
                })
            }} className="back-btn-css">
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"rgb(33, 150, 243)",margin:2}}/>
         </div>
           <div  className="best-selling-cont">
                {Data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item" key={i}>
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
                              duration:1000
                            })
                          dispatch(GetSelectedPebble(data._id))
                          History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <div className="bestselling-head">
                          <div style={{fontSize:"0.95rem",padding:"0px"}}>{(data?.name?.length>20)?data?.name?.substring(0, 15)+"...":data?.name}</div>
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
                          <h1 style={{fontSize:12}}>{data?.prize}</h1>
                    </div>
                    <IonCardContent style={{padding:"0"}}>
                          <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                           <p><BiRupee/>{data?.price}</p>
                           <div style={{display:"contents"}}>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(GetSelectedPebble(data._id))
                          History.push("/page/ViewPage")}}>View</IonButton>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 1000
                            })
                          dispatch(Addtocart(data))}}>Add To Cart</IonButton>
                          </div>
                    </div>
                </IonCardContent>
                  </IonCard>
                )
               ) }
               </div>
               </div>
           </div>
)
}