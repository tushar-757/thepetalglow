import { IonCard,IonButton,IonCardContent,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {  useDispatch, useSelector} from 'react-redux';
import {arrowBackCircle } from "ionicons/icons"
import { Addtocart,getIndoorProduct ,addToLikes,removefromLikes} from '../Actions';
import {BiRupee} from 'react-icons/bi'
import {useHistory} from 'react-router-dom'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useState } from 'react';
import LoadingBox from '../components/LoadingComponent';
export default function IndoorPage(){
    const dispatch=useDispatch();
    const History = useHistory();
    const Data=useSelector((state)=>state.ProductReducer.Indoor)
    const Loading=useSelector((state)=>state.ProductReducer.loading)
    const [present, dismiss] = useIonLoading();
    const [like,setLike]=useState(false)
return(
     (Loading)?
     <>
        <LoadingBox/>
     </>:
    <div className="best-selling-cont">
           <div onClick={()=>History.goBack()} style={{
    position: 'absolute',
    width: '0px',
    top: '-3px'
}}>
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:5}}/>
         </div>
                {Data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item">
                      <IonCardHeader style={{padding:'0px'}}>
                            {console.log(data?.images?.[0])}
                         <img src={data?.images?.[0]}/>
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
                    <IonCardContent style={{padding:"0px"}}>
                          <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                          <p style={{alignItems:'center',fontWeight:"bold",display:'flex'}}><BiRupee/>{data?.price}</p>
                          {(data?.quantity>0)?<>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(getIndoorProduct(data._id))
                          History.push("/page/ViewPage")}}>View</IonButton>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 1000
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
)
}