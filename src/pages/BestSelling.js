import { IonCard,IonButton,IonCardContent,useIonLoading, IonCardHeader } from '@ionic/react';
import {  useDispatch} from 'react-redux';
import { Addtocart,GETSELECTEDBESTSELLING } from '../Actions';
import {useHistory} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useState } from 'react';
export default function BestSelling({data}){
    const dispatch=useDispatch();
    const History = useHistory();
    const [present, dismiss] = useIonLoading();
    const [like,setLike]=useState(false)


return(
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

                      <div className="bestselling-head">
                          <div style={{fontSize:"0.95rem",padding:"0px"}}>{(data?.name?.length>20)?data?.name?.substring(0, 20)+"...":data?.name}</div>
                          <div>|</div>
                             <div onClick={()=>setLike(!like)}>
                                {(!like)?
                                <AiOutlineHeart style={{fontSize:"24px",color:"green"}}/>:
                                <AiFillHeart style={{fontSize:"24px",color:"green"}}/>}
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
                        present({
                              message: 'Loading...',
                              duration:1000
                            })
                          dispatch(GETSELECTEDBESTSELLING(data._id))
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
                </IonCardContent>
                  </IonCard>
                )
               ) }
           </div>
)
}