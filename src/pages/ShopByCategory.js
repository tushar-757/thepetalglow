import { bag, beaker, gift, home, leaf} from 'ionicons/icons';
import { IonModal,IonPage,IonContent, IonIcon,IonButton,useIonAlert} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setLoading,setUnLoading } from '../Actions';
import { useDispatch, useSelector } from "react-redux";
import './ShopByCategory.css';

function PlantModal({showPlantModal,setShowPlantModal,setLoading,startLoading}){
    const History = useHistory();
    const dispatch=useDispatch()

    return(
        <div>
        <IonModal isOpen={showPlantModal} cssClass='my-custom-class' backdropDismiss={false} class="animate__animated animate__pulse" classname="modal-head"  style={{padding:"15px"}}>
               <IonButton color="success" onClick={() => setShowPlantModal(false)} style={{color:'white'}}>Close </IonButton>
               <div className="model-cont">
                   <div className="model-cont-item" onClick={()=>{
                       startLoading()
                       setShowPlantModal(false)
                       History.push("/page/SeasonalPlants")}}>
                       <h1>Seasonal</h1>
                   </div>
                   <div className="model-cont-item" onClick={()=>{
                       startLoading()
                       setShowPlantModal(false)
                       History.push("/page/IndoorPlants")}}>
                       <h1>Indoor</h1>
                   </div>
                   <div className="model-cont-item" onClick={()=>{
                       startLoading()
                       setShowPlantModal(false)
                       History.push("/page/OutdoorPlants")}}>
                       <h1>Outdoor</h1>
                   </div>
                   <div className="model-cont-item" onClick={()=>{
                       startLoading()
                       setShowPlantModal(false)
                       History.push("/page/SucculentPlants")}}>
                       <h1>Succulent</h1>
                   </div>
               </div>
             </IonModal>
              <div className="div-shop-by-category" onClick={() => setShowPlantModal(true)}>
              <IonIcon md={leaf} className="icons-SBC"/>
              <h1 className="div-shop-by-category-title">Plants</h1>
           </div>
        </div>
    )
}
function PotModal({showPotModal,setShowPotModal}){
    const History = useHistory()
    return(
        <div>
        <IonModal isOpen={showPotModal} cssClass='my-custom-class' class="animate__animated animate__pulse" backdropDismiss={false} style={{padding:"15px"}}>
               <IonButton color="success" onClick={() => setShowPotModal(false)} style={{color:'white'}}>Close </IonButton>
               <div  className="model-cont">
                   <div className="model-cont-item" onClick={()=>{
                        setShowPotModal(false)
                    History.push("/page/Pebbles")}}>
                       <h1>Pebbles</h1>
                   </div>
                   <div className="model-cont-item"
                   onClick={()=>{
                    setShowPotModal(false)
                    History.push("/page/PlasticPots")}}>
                       <h1>Plastic Planters</h1>
                   </div>
                   <div className="model-cont-item"
                    onClick={()=>{
                        setShowPotModal(false)
                        History.push("/page/EarthenPots")}}>
                       <h1>Earthen Planters</h1>
                   </div>
                   <div className="model-cont-item"
                    onClick={()=>{
                        setShowPotModal(false)
                        History.push("/page/CeramicPots")}}>
                       <h1>Ceramic Planters</h1>
                   </div>
               </div>
             </IonModal>
               <div className="div-shop-by-category" onClick={() => setShowPotModal(true)}>
               <IonIcon md={beaker} className="icons-SBC"/>
               <h1 className="div-shop-by-category-title">Pebbles& Planters</h1>
               </div>
        </div>
    )
}


export default function ShopByCategory(){
    const [showPlantModal, setShowPlantModal] = useState(false);
    const [showPotModal, setShowPotModal] = useState(false);
    const History = useHistory()
    const dispatch=useDispatch()
    const startLoading=()=>{
        dispatch(setLoading(true))
        setTimeout(()=>{
           dispatch(setUnLoading(false))
        },[1000])
    }
    const [present] = useIonAlert();
return (
    <>
    <div style={{width:"100%",height:150}} className="white-background">
    <h1 style={{display:"flex",fontFamily:"Cabin,sans-serif",color:"#484848",fontSize:18,margin:0,justifyContent:"center",alignItems:"center",height:50}}>Shop By Category</h1>
  <div style={{display:"flex",justifyContent:"space-around",position:"relative"}}>
           <PlantModal showPlantModal={showPlantModal} setShowPlantModal={setShowPlantModal} startLoading={startLoading} />
           <PotModal showPotModal={showPotModal} setShowPotModal={setShowPotModal}/>
            <div className="div-shop-by-category"   onClick={()=>History.push('/page/SoilandFertilizers')}>
           <IonIcon md={bag} className="icons-SBC"/>
              <h1 className="div-shop-by-category-title">Soil & Fertilizers</h1>
              </div>
       <div className="div-shop-by-category" onClick={() =>
            present({
              cssClass: 'my-css',
              header: 'Alert',
              message: 'Currenty Services Are Not Available',
              buttons: [
                { text: 'Ok', handler: (d) => console.log('ok pressed') },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })}>
       <IonIcon md={home} className="icons-SBC"/>
       <h1 className="div-shop-by-category-title">Home Services</h1>
       </div>

       <div className="div-shop-by-category"  onClick={() =>
            present({
              cssClass: 'my-css',
              header: 'Alert',
              message: 'Currenty Services Are Not Available',
              buttons: [
                { text: 'Ok', handler: (d) => console.log('ok pressed') },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })}>
       <IonIcon md={gift} className="icons-SBC"/>
       <h1 className="div-shop-by-category-title">Gifts</h1>
       </div>
  </div>
  </div>
  </>
)
}