import { IonCard,IonButton,IonCardContent,useIonToast,useIonLoading, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart,GETSELECTEDBESTSELLING ,addToLikes,removefromLikes} from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import LoadingBox from '../components/LoadingComponent';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyBox from '../static/box.png'
import './BestSelling.css'

export default function BestSelling(){
      const data=useSelector((state)=>state.ProductReducer.BestSellingData)
      const Loading=useSelector((state)=>state.ProductReducer.loading)
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const [like,setLike]=useState(false)
    const [present1, dismiss1] = useIonToast();
    const [Data,setData]=useState([])
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
          setempty(true)
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
    <div className="best-selling-cont" style={{marginTop:"20px"}}>
       {(empty)?
                        <div className="emptybox-div">
                        <img className="emptybox-div-img" src={EmptyBox}/>
                        </div>
                        :null}
                {Data?.map((d,i)=>(
                  <IonCard className="best-selling-cont-item"
                    style={{position:"relative"}}
                    key={d?._id}>
                      {/* <span className="best-selling-cont-festival-msg"
                      style={{color:data[0]?.color}}>{data[0]?.message}</span> */}
                      <IonCardHeader style={{padding:'0px'}}>
                         <LazyLoadImage
                            alt={d?.name}
                            src={d?.images?.[0]}
                            effect="blur"
                            height={150}
                            width="100%"
                            onClick={()=>{
                              present({
                                    message: 'Loading...',
                                    duration:100
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
                    <h1 className="best-selling-tag">Best Selling</h1>

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
                           <div className="price-box-view">
                          <p style={{alignItems:'center',padding:"0px",fontWeight:"bold",display:'flex'}}><BiRupee/>{d?.price}</p>
                          <p style={{color:"#ff5722",marginLeft:8}}>{(d?.quantity<10&&d?.quantity>0)?
                          `Hurry up only
                           ${d?.quantity} left`:null}</p>
                          </div>
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
                        //  present({
                        //        message: 'Loading...',
                        //        duration:100
                        //      })
                          }}>View</IonButton>
                           {(d?.quantity>0)?<>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 200
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