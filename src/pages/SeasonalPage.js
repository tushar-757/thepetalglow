import { IonCard,IonButton,IonCardContent,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { Addtocart, getSeasonalProduct } from '../Actions';
import {useHistory} from 'react-router-dom'
import LoadingBox from '../components/LoadingComponent';
import {arrowBackCircle } from "ionicons/icons"
import {BiRupee} from 'react-icons/bi'

export default function SeasonalPage(){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const data=useSelector((state)=>state.ProductReducer.Seasonal)
    const Loading=useSelector((state)=>state.NotificationReducer.Loading)
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
                {data?.map((data,i)=>(
                    <IonCard className="best-selling-cont-item">
                      <IonCardHeader style={{padding:'0px'}}>
                            {console.log(data?.images?.[0])}
                         <img src={data?.images?.[0]} onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(getSeasonalProduct(data._id))
                          History.push("/page/ViewPage")}}/>
                      </IonCardHeader>
                    <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection:'column'
                    }}>
                    <h1 className="best-selling-tag" style={{background:"#2196f3"}}>{data?.season} Season</h1>
                    {/* <h1 style={{fontSize:8}}>1256+</h1> */}
                          <h1 style={{fontSize:"0.8rem",padding:"10px"}}>{data?.name}</h1>
                          {/* <h1 style={{fontSize:6}}>{data?.type}</h1> */}
                          <h1 style={{fontSize:12}}><BiRupee/>{data?.price}</h1>
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
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(getSeasonalProduct(data._id))
                          History.push("/page/ViewPage")}}>View</IonButton>
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
           </div>
)
}