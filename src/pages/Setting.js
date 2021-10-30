import { IonPage, IonContent,IonLabel, IonModal,IonButton,IonItem, IonList,IonToggle, IonTitle, IonIcon} from '@ionic/react';
 import { withRouter,useHistory  } from 'react-router';
 import { arrowForwardOutline,arrowBackCircle } from 'ionicons/icons';
import './Home.css';
import { useState } from 'react';
import Accountpage from '../components/Accountpage';
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addUser,} from "../Actions";

const Setting=() => {
    const [checked, setChecked] = useState(true);
    const [Account,setAccount]=useState(false)
    const History=useHistory();
    const [user, user_id] = IsLoggedIn();
    const dispatch=useDispatch()

    useEffect(() => {
      try{
        if (user != null && user_id != null) {
          // console.log(JSON.parse(JSON.stringify(user)))
           const parserduser=JSON.parse(user)
            dispatch(addUser({id:parserduser.id,username:parserduser.username,
                mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
        }
      }catch(e){
        console.log(e)
      }
    },[user,user_id])


  return (
    <IonPage>
      <IonContent>
         {(Account)?<IonList style={{paddingTop:'14px'}}>
              <IonItem onClick={()=>setAccount(false)}>
                  <IonTitle>Account
                  </IonTitle>
                      <IonIcon md={arrowForwardOutline}/>
              </IonItem>
              <IonItem>
                <IonTitle>Notification</IonTitle>
                <IonItem>
                <IonLabel>Checked: {JSON.stringify(checked)}</IonLabel>
                <IonToggle checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
               </IonItem>
              </IonItem>
            </IonList>:<Accountpage setAccount={setAccount} />}
           </IonContent>
        </IonPage>
  );
};

export default withRouter(Setting);