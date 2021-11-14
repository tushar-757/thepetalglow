import { IonCard,IonButton,IonCardContent,useIonLoading,IonIcon, IonCardHeader } from '@ionic/react';
import {  useDispatch,useSelector} from 'react-redux';
import { GetItem,getIndoorProduct } from '../Actions';
import {useHistory} from 'react-router-dom'
import LoadingBox from '../components/LoadingComponent';
import {arrowBackCircle } from "ionicons/icons"

export default function SeasonalPage(){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const data=useSelector((state)=>state.ProductReducer.Indoor)
    const Loading=useSelector((state)=>state.NotificationReducer.Loading)
return(
      (Loading)?
      <>
      <LoadingBox/>
      </>:
      <div>
           <div onClick={()=>{
                 History.goBack()
                 present({
                  message: 'Loading...',
                   duration:1000
                })
            }} className="back-btn-css">
          <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"lightgreen",margin:2}}/>
         </div>
    <div className="best-selling-cont">
                {data?.map((data,i)=>(
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
                    <h1 className="best-selling-tag">Best Selling</h1>
                    {/* <h1 style={{fontSize:8}}>1256+</h1> */}
                          <h1 style={{fontSize:"0.8rem",padding:"10px"}}>{data?.name}</h1>
                          {/* <h1 style={{fontSize:6}}>{data?.type}</h1> */}
                          <h1 style={{fontSize:12}}>{data?.prize}</h1>
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
                          dispatch(getIndoorProduct(data._id))
                          History.push("/page/ViewPage")}}>View</IonButton>
                    <IonButton fill="solid" slot="end" style={{color:"white", width: '126px',
    height: '25px',fontSize:"0.8rem"}}
                       onClick={()=>{
                        present({
                              message: 'Loading...',
                              duration: 1000
                            })
                          dispatch(GetItem(data._id))
                          History.push("/page/ViewPage")}}>Add To Cart</IonButton>
                    </div>
                </IonCardContent>
                  </IonCard>
                )
               ) }
           </div>
           </div>
)
}