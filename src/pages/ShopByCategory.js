import { bag, beaker, gift, home, leaf} from 'ionicons/icons';
import { IonModal, IonIcon,IonButton,useIonAlert} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchIndoorProduct,FetchOutdoorProduct,FetchSeasonalProduct } from '../Actions';
import { useDispatch } from "react-redux";
import './ShopByCategory.css';

function PlantModal({showPlantModal,setShowPlantModal}){
    const History = useHistory();
    const dispatch=useDispatch()
    return(
        <div>
        <IonModal isOpen={showPlantModal} cssClass='my-custom-class' classname="modal-head"  style={{padding:"15px"}}>
               <IonButton onClick={() => setShowPlantModal(false)} style={{color:'white',padding:"10px"}}>Close </IonButton>
               <div className="model-cont">
                   <div className="model-cont-item" onClick={()=>{
                       History.push("/page/SeasonalPlants")}}>
                       <h1>Seasonal</h1>
                   </div>
                   <div className="model-cont-item" onClick={()=>{
                       History.push("/page/IndoorPlants")}}>
                       <h1>Indoor</h1>
                   </div>
                   <div className="model-cont-item" onClick={()=>{
                       History.push("/page/OutdoorPlants")}}>
                       <h1>Outdoor</h1>
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
    return(
        <div>
        <IonModal isOpen={showPotModal} cssClass='my-custom-class' style={{padding:"15px"}}>
               <IonButton onClick={() => setShowPotModal(false)} style={{color:'white',height:'200px'}}>Close </IonButton>
               <div  className="model-cont">
                   <div className="model-cont-item">
                       <h1>Plastic</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>Mud</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>Ceramic</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>Fibre</h1>
                   </div>
               </div>
             </IonModal>
               <div className="div-shop-by-category" onClick={() => setShowPotModal(true)}>
               <IonIcon md={beaker} className="icons-SBC"/>
               <h1 className="div-shop-by-category-title">Planters</h1>
               </div>
        </div>
    )
}
function CompostModal({showCompostModal,setShowCompostModal}){
    return(
        <div>
        <IonModal isOpen={showCompostModal} cssClass='my-custom-class'  style={{padding:"15px"}}>
               <IonButton onClick={() => setShowCompostModal(false)} style={{color:'white'}}>Close </IonButton>
               <div  className="model-cont">
                   <div className="model-cont-item">
                       <h1>Vermi Compost</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>full Packet Of mUD</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>Sarso Ki Khali</h1>
                   </div>
                   <div className="model-cont-item">
                       <h1>Fibre</h1>
                   </div>
               </div>
             </IonModal>
             <div className="div-shop-by-category"  onClick={() => setShowCompostModal(true)}>
             <IonIcon md={bag} className="icons-SBC"/>
             <h1 className="div-shop-by-category-title">Soil & Fertilizers</h1>
             </div>
        </div>
    )
}


export default function ShopByCategory(){
    const [showPlantModal, setShowPlantModal] = useState(false);
    const [showPotModal, setShowPotModal] = useState(false);
    const [showCompostModal, setShowCompostModal] = useState(false);
    const [present] = useIonAlert();
return (
    <div style={{width:"100%",height:100,backgroundColor:"white",marginBottom:40}}>
    <h1 style={{display:"flex",fontFamily:"Salsa",color:"#484848",fontSize:18,margin:0,justifyContent:"center",alignItems:"center",height:50}}>Shop By Category</h1>
  <div style={{display:"flex",justifyContent:"space-around",position:"relative"}}>
           <PlantModal showPlantModal={showPlantModal} setShowPlantModal={setShowPlantModal}/>
           <PotModal showPotModal={showPotModal} setShowPotModal={setShowPotModal}/>
           <CompostModal showCompostModal={showCompostModal} setShowCompostModal={setShowCompostModal}/>
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
)
}