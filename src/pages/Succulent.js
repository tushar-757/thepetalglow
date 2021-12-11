import { IonCard,IonButton,IonCardContent,useIonToast,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart, GetSelectedSucculent,addToLikes,removefromLikes } from '../Actions';
import {useHistory} from 'react-router-dom'
import LoadingBox from '../components/LoadingComponent';
import {arrowBackCircle } from "ionicons/icons"
import { useEffect, useState } from 'react';
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import EmptyBox from '../static/box.png'

export default function Succulent(){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const data=useSelector((state)=>state.ProductReducer.Succulent)
    const Loading=useSelector((state)=>state.NotificationReducer.Loading)
    const [Data,setData]=useState([])
    const [present1, dismiss1] = useIonToast();
    const [empty,setempty]=useState(false)

    useEffect(()=>{
      if(Array.isArray(data)){
            if(data?.length===0){
                  setempty(true)
                  present1(
                    {
                      color: 'warning',
                      duration: 1000,
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
      (Loading)?
      <>
      <LoadingBox/>
      </>:
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
    <div className="best-selling-cont">
    {(empty)?
                        <div className="emptybox-div">
                        <img className="emptybox-div-img" src={EmptyBox}/>
                        </div>
                        :null}
                {Data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item">
                      <IonCardHeader style={{padding:'0px'}}>
                         <img src={data?.images?.[0]} onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(GetSelectedSucculent(data._id))
                          History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <h1 className="best-selling-tag" style={{background:"#ff0047"}}>Succulent</h1>
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
                    </div>
                    <IonCardContent>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                         dispatch(GetSelectedSucculent(data._id))
                         History.push("/page/ViewPage")
                        //  present({
                        //        message: 'Loading...',
                        //        duration:100
                        //      })
                          }}>View</IonButton>
                           {(data?.quantity>0)?<>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 200
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
)
}