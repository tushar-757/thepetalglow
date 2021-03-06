import { IonCard,IonButton,IonPage,IonContent,IonCardContent,useIonToast,useIonLoading, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart,GETSELECTEDBESTSELLING ,addToLikes,removefromLikes} from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import EmptyBox from '../static/box.png'
import Header from '../components/Header';

export default function WishList(){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const [Data,setData]=useState([])
    const [present1, dismiss1] = useIonToast();
    const data1=localStorage.getItem("wishlistitems")
    const data=JSON.parse(data1)

   useEffect(()=>{
    if(Array.isArray(data)){
          if(data?.length===0){
          present1(
                {
                    color: 'light',
                    duration: 2000,
                    message: `nothing to show`
                  })
          }else{
            setData(data)

          }
     }else{
      present1(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${data}`
            })
         }
   },[])
return(
  <>
  <IonPage>
    <Header/>
    <IonContent>
  <>
    <div className="best-selling-cont">
      {(Data?.length===0)?
              <div className="emptybox-div">
              <img className="emptybox-div-img" src={EmptyBox}/>
              </div>
              :null}
                {Data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item" key={data?._id}>
                      <IonCardHeader style={{padding:'0px'}}>
                         <img src={data?.images?.[0]}
                          onClick={()=>{
                              present({
                                    message: 'Loading...',
                                    duration:1000
                                  })
                                dispatch(GETSELECTEDBESTSELLING(data._id))
                                History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
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
                          <p style={{alignItems:'center',padding:"0px",fontWeight:"bold",display:'flex'}}><BiRupee/>{data?.price}</p>
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
                         dispatch(GETSELECTEDBESTSELLING(data._id))
                         History.push("/page/ViewPage")
                         present({
                               message: 'Loading...',
                               duration:1000
                             })
                          }}>View</IonButton>
                           {(data?.quantity>0)?<>
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
           </>
           </IonContent>
           </IonPage>
           </>
)
}