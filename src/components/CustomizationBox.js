import { IonButton,IonLabel,IonItem,useIonToast,IonChip,IonList,IonListHeader,IonCheckbox,IonModal } from "@ionic/react"
import {useState} from 'react'
import { useSelector } from "react-redux";
import {EditCustomDescription,RemoveCustomDescription,setEditToFalse} from '../Actions/CartActions';

export function CustomziationBox({checked,setCheckBox,dispatch,customArrayHandler,customArrayEditHandler,setq1,setq2,setSku1,addtoCustomization,setSku2}){
      const [showModal, setShowModal] = useState(false);
      const customarray1=useSelector((state)=>state.CartReducer.customdescription)
      const [edit,setEdit]=useState(false)
      const [present, dismiss] = useIonToast();


      const SubmitHandler=(e,data)=>{
        e.preventDefault();
        customArrayEditHandler(e,data.id)
        dispatch(setEditToFalse(data?.id))
      }

    return(
        <div>
                 <IonModal isOpen={showModal} backdropDismiss={false} style={{height:'500px'}}>
                 <IonList style={{padding:0}}>
         <IonListHeader>Please read carefully</IonListHeader>
         <IonItem>Terms and Conditions</IonItem>
         <IonItem>Your description must have products/items that you have added in your cart</IonItem>
         <IonItem>We will try our best to follow your description but if it is any kind of invalid request then that won't be fulfill </IonItem>
       </IonList>
       <div style={{display:"flex",margin:"0 12px"}}>
           <div style={{margin:"0 5px"}}>
              <IonCheckbox style={{color:"white"}} checked={checked} onIonChange={(e)=>setCheckBox(e.detail.checked)} />
           </div>
           <div>
               <span style={{fontSize:"12px"}}>i Confirm</span>
           </div>
       </div>
        <IonButton onClick={() => {
            setShowModal(false)
            }}  style={{color:"white"}}>Submit</IonButton>
        <IonButton onClick={() => setShowModal(false)}  style={{color:"white"}}>Close</IonButton>
      </IonModal>
        <div style={{ margin:'1rem'}}>
          {(customarray1?.length>0)?
          <>
          <IonChip color="primary" className="example-chip">
            <IonLabel>{`you have successfuly submitted ${customarray1.length} descriptive customization`}</IonLabel>
              </IonChip>
              <div style={{padding:"16px",color:"green"}}>
                {customarray1?.map((data,i)=>{
                  if(!data.isedit){
                    return <div key={i}>
                    <div>{data?.description}</div>
                       <IonButton color="tertiary" onClick={()=>dispatch(EditCustomDescription(i))}>edit</IonButton>
                        <IonButton color="danger" onClick={()=>dispatch(RemoveCustomDescription(data?.id))}>remove</IonButton>
                  </div>
                  }else{
                      return <form onSubmit={(e)=>{
                        SubmitHandler(e,data)
                       }}
                      style={{display:"flex",justifyContent:"space-around",flexDirection:"column",margin:'0.2rem'}} key={i}>
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
                               TPG_<input placeholder="your plant sku last 3 digits" maxLength="3" onChange={(e)=>setSku1(e.target.value)} required/>
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
                           TPG_<input placeholder="your Pot sku last 3 digits" maxLength="3" onChange={(e)=>setSku2(e.target.value)} required/>pot
                          </div>
                          <div>
                          <IonButton type="submit" color="secondary">
                            save</IonButton>
                          <IonButton type="submit" color="warning">
                            cancel</IonButton>
                            </div>
                      </form>
                  }
                })}
              </div>
              </>:null}
        <IonChip color="success" className="example-chip">
      <IonLabel>for example:-
       i want my 1 TPG_004 plant inside 1 TPG_083 pot</IonLabel>
    </IonChip>
    <div>
      <div>
      </div>
             <form  onSubmit={(e)=>{
               customArrayHandler(e)
               present(
                {
                    color: 'success',
                    duration: 2000,
                    message: `customization added successfully`
                  })}}
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
                      TPG_<input placeholder="your plant sku last 3 digits"  maxLength="3" onChange={(e)=>setSku1(e.target.value)} required/>
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
                  TPG_<input placeholder="your Pot sku last 3 digits" maxLength="3" onChange={(e)=>setSku2(e.target.value)} required/>pot
                 </div>
                 <div>
                 <IonButton type="submit" color="success" >
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