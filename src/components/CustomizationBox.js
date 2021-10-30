import { IonButton,IonLabel,IonItem,IonChip,IonList,IonListHeader,IonCheckbox,IonModal } from "@ionic/react"
import {useState} from 'react'
import { useSelector } from "react-redux";

export function CustomziationBox({customarray,dispatch,customArrayHandler,setq1,setq2,setSku1,addtoCustomization,setSku2}){
      const [showModal, setShowModal] = useState(false);
      const [checked,setCheckBox]=useState(false)
      const customarray1=useSelector((state)=>state.CartReducer.customdescription)
    return(
        <div>
                 <IonModal isOpen={showModal} backdropDismiss={false} style={{height:'500px'}}>
                 <IonList>
         <IonListHeader>Please read carefully</IonListHeader>
         {/* <IonItem button>you could request us for plant repot customization
         by typing your In Cart Item SKU but in case we found some invalid SKU OR
         no Item in cart related to your SKU then your request won't be fulfill</IonItem> */}
         {/* <IonItem>Describe your Customization here if any in brief</IonItem> */}
         <IonItem>Terms and Conditions</IonItem>
         <IonItem>Your description must have products/items that you have added in your cart</IonItem>
         <IonItem>We will try our best to follow your description but if it is any kind of invalid request then that won't be fulfill </IonItem>
       </IonList>
       <div style={{display:"flex",margin:"0 12px"}}>
           <div style={{margin:"0 5px"}}>
              <IonCheckbox style={{color:"white"}} checked={checked} onClick={()=>{setCheckBox(checked)}} />
           </div>
           <div>
               <span style={{fontSize:"12px"}}>i Confirm</span>
           </div>
       </div>
        <IonButton onClick={() => {
             dispatch(addtoCustomization(customarray))
            setShowModal(false)}}  style={{color:"white"}}>Submit</IonButton>
        <IonButton onClick={() => setShowModal(false)}  style={{color:"white"}}>Close</IonButton>
      </IonModal>
        <div style={{ margin:'1rem'}}>
          {(customarray1?.length>0)?<IonChip color="primary" className="example-chip">
            <IonLabel>{`you have successfuly submitted ${customarray1.length} descriptive customization`}</IonLabel>
              </IonChip>:null}
        <IonChip color="secondary" className="example-chip">
      <IonLabel>for example:-
       i want my 1 TPG_004 plant inside 1 TPG_083 pot</IonLabel>
    </IonChip>
    <div>
      <div>
        {customarray?.map((data)=>
           <p>{data}</p>
        )}
      </div>
             <form  onSubmit={(e)=>customArrayHandler(e)}
             style={{display:"flex",justifyContent:"space-around",flexDirection:"column",margin:'0.2rem'}}>
               <div>
                i want my
                 </div>
                 <div>
                 <select  onChange={(e)=>setq1(e.target.value)}>
                   <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
                 <option>5</option>
                 </select>
                 </div>
                  <div>
                      TPG_<input placeholder="your plant sku last 3 digits"  maxlength="3" onChange={(e)=>setSku1(e.target.value)} required/>
                  </div>
                  <div>plant inside</div>
                  <div>
               <select onChange={(e)=>setq2(e.target.value)}>
               <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
                 <option>5</option></select>
                  </div>
                 <div>
                  TPG_<input placeholder="your Pot sku last 3 digits" maxlength="3" onChange={(e)=>setSku2(e.target.value)} required/>pot
                 </div>
                 <div>
                 <IonButton type="submit" color="secondary" >
                   Add</IonButton>
                   </div>
             </form>
             </div>
             <IonButton style={{color:"white"}}
             onClick={()=>{
                setShowModal(true)
                }
                 }>Confirm</IonButton>
             </div>
        </div>
    )
}