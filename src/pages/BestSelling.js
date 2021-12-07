import { IonCard,IonButton,IonCardContent,useIonLoading, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart,GETSELECTEDBESTSELLING ,addToLikes,removefromLikes} from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import LoadingBox from '../components/LoadingComponent';
import { useEffect, useState } from 'react';
export default function BestSelling(){
      const data=useSelector((state)=>state.ProductReducer.BestSellingData)
      const Loading=useSelector((state)=>state.ProductReducer.loading)
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const [like,setLike]=useState(false)

return(
  (Loading)?
  <>
  <LoadingBox/>
  </>:
    <div className="best-selling-cont" style={{marginTop:"20px"}}>
                {data?.map((d,i)=>(
                  <IonCard className="best-selling-cont-item" style={{position:"relative"}} key={i}>
                      <span className="best-selling-cont-festival-msg"
                      style={{color:data[0]?.color}}>{data[0]?.message}</span>
                      <IonCardHeader style={{padding:'0px'}}>
                         <img src={d?.images?.[0]}
                          onClick={()=>{
                              present({
                                    message: 'Loading...',
                                    duration:1000
                                  })
                                dispatch(GETSELECTEDBESTSELLING(d._id))
                                History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <h1 className="animate__animated animate__pulse animate__infinite animate-faster best-selling-tag">Best Selling</h1>

                      <div className="bestselling-head">
                          <div style={{fontSize:"0.95rem",padding:"0px"}}>{(d?.name?.length>12)?d?.name?.substring(0, 12)+"...":d?.name}</div>
                          <div>|</div>
                             <div  style={{
                                   display: 'flex',
                                   alignItems: 'center'
                             }}>
                                <span style={{margin:"4px"}}>{d?.likes}</span>
                                {(!d?.isLiked)?
                                <AiOutlineHeart style={{fontSize:"24px",color:"#e91e1e"}} onClick={()=>dispatch(addToLikes(d?._id))}/>:
                                <AiFillHeart style={{fontSize:"24px",color:"#e91e1e"}} onClick={()=>dispatch(removefromLikes(d?._id))}/>}
                                </div>
                           </div>
                          <p style={{alignItems:'center',padding:"0px",fontWeight:"bold",display:'flex'}}><BiRupee/>{d?.price}</p>
                    </div>
                    <IonCardContent style={{padding:"0"}}>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                         dispatch(GETSELECTEDBESTSELLING(d._id))
                         History.push("/page/ViewPage")
                         present({
                               message: 'Loading...',
                               duration:1000
                             })
                          }}>View</IonButton>
                           {(d?.quantity>0)?<>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 1000
                            })
                          dispatch(Addtocart(d))
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