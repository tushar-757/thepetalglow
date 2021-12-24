import { IonPage, IonContent,IonModal,useIonToast, IonTitle,IonLoading,IonIcon, IonHeader, IonButton, IonInput} from '@ionic/react';
 import { withRouter,useHistory  } from 'react-router';
import { arrowBackCircle } from 'ionicons/icons';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import api from '../Services/urlApi';
import { addUser,RemoveUser,EmptyOrders } from '../Actions';
import {EmptyCart} from '../Actions/CartActions'
import './Accountpage.css'



const AccountPage=(props) => {
    const [checked, setChecked] = useState(true);
    const [present1, dismiss] = useIonToast();
    const History=useHistory();
    const dispatch=useDispatch();
    const user=useSelector((state)=>state?.UserReducer?.User)
    const [username1,setUsername]=useState(user?.username);
    const [mobile1,setMobile]=useState(user?.mobile);
    const [email1,setEmail]=useState(user?.email);
    const [hno,sethno]=useState(user?.Address?.hno);
    const [society,setsociety]=useState(user?.Address?.society);
    const [pincode,setpincode]=useState(user?.Address?.pincode);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [loading,setLoading]=useState(false)
    const user_id=localStorage.getItem('user_id')
    const useraccesstoken=localStorage.getItem('useraccesstoken')
    const updateModel1=()=>{
      if(user.username===''){
       return History.push('/page/Login')
        }
        setShowModal(true)
    }
    const UpdateUserHandler=async()=>{
      if(user.username===''){
        return History.push('/page/Login')
        }
        try{
            setLoading(true)
            const response=await api.put('/user/UpdateUser',{
            headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
            username1,
            mobile1,
            email1
        })
        present1(
          {
              color: 'success',
              duration: 2000,
              message: `Updated Successfully`
            })
        const { username,email,mobile,Address,id ,token} = response.data
        const user1={
            id:id,
            username:username,
            email:email,
            mobile:mobile,
            Address:Address
        }
        dispatch(addUser({id,username,mobile,email,Address}))
        localStorage.setItem('user',JSON.stringify(user1));
        localStorage.setItem('user_id',id);
        localStorage.setItem('useraccesstoken',token);
        setLoading(false)
        setShowModal(false)
    }catch(e){
        present1(
          {
              color: 'danger',
              duration: 2000,
              message: `${e?.response?.data?.message}`
            })
    }
    }
    const UpdateAddressHandler=async()=>{
      if(user.username===''){
        return History.push('/page/Login')
        }
        try{
            setLoading(true)
            const response=await api.put('/user/UpdateUserAddress',{
                headers:{user_id,Authorization:`Bearer ${useraccesstoken}`},
                 hno,
                 society,
                 pincode
            })
            const { username,email,mobile,Address,id ,token} = response.data
        const user1={
            id:id,
            username:username,
            email:email,
            mobile:mobile,
            Address:Address
        }
        dispatch(addUser({id,username,mobile,email,Address}))
        localStorage.setItem('user',JSON.stringify(user1));
        localStorage.setItem('user_id',id);
        localStorage.setItem('useraccesstoken',token);
        setLoading(false)
        setShowModal1(false)
        present1(
          {
              color: 'success',
              duration: 2000,
              message: `Address Successfully Updated`
            })
        }catch(e){
            present1(
              {
                  color: 'danger',
                  duration: 2000,
                  message: `${e?.response?.data?.message}`
                })
        }
    }
    const DeleteHandler=async()=>{
      try{
        setLoading(true)
        const response=await api.delete("/user/DeleteAccount",{
          headers:{user_id,Authorization:`Bearer ${useraccesstoken}`}
      })
        setLoading(false)
        setShowModal1(false)
        alert(response?.data?.message)
        dispatch(EmptyCart())
        dispatch(EmptyOrders())
        dispatch(RemoveUser())
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        localStorage.removeItem('useraccesstoken');
        localStorage.removeItem('orderID');
        present1(
          {
              color: 'success',
              duration: 2000,
              message: `Accout Deleted Successfully`
            })
    }catch(e){
      present1(
        {
            color: 'danger',
            duration: 2000,
            message: `${e?.response?.data?.message}`
          })
    }
    }
  return (
    <div>
        <IonModal isOpen={showModal} cssClass='my-custom-class' backdropDismiss={false}>
        <IonInput value={username1} onIonChange={(e)=>setUsername(e.target.value)} placeholder="username"/>
        <IonInput value={mobile1} onIonChange={(e)=>setMobile(e.target.value)} placeholder="mobile"/>
        <IonInput value={email1} onIonChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
        <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
        <IonButton color="tertiary" onClick={()=>UpdateUserHandler()}>Update</IonButton>
        <IonButton onClick={() => setShowModal(false)} style={{color:"white"}}>Close</IonButton>
      </IonModal>
        <IonModal isOpen={showModal1} cssClass='my-custom-class' backdropDismiss={false}>
        <IonInput value={hno} onIonChange={(e)=>sethno(e.target.value)} placeholder="Hno"/>
        <IonInput value={society} onIonChange={(e)=>setsociety(e.target.value)} placeholder="Society"/>
        <IonInput value={pincode} onIonChange={(e)=>setpincode(e.target.value)} placeholder="Pincode"/>
        <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
        <IonButton color="tertiary" onClick={()=>UpdateAddressHandler()}>Update</IonButton>
        <IonButton onClick={() => setShowModal1(false)} style={{color:"white"}}>Close</IonButton>
      </IonModal>
        <IonModal isOpen={showModal2} cssClass='my-custom-class' backdropDismiss={false}>
            <h2 style={{padding:"15px"}} className="delete-account-h2">Are you sure?</h2>
            <p style={{padding:"15px"}} className="delete-account-p">you will loose all information by doing this,make sure you do
            not have any active orders otherwise we will loose order data and your payment will have no tracks for us to understand your query </p>
            <IonLoading
        cssClass='my-custom-class'
        isOpen={loading}
        // onDidDismiss={() => setShowLoading(false)}
        duration={5000}
        message={'Please wait...'}
      />
        <IonButton color="danger" onClick={()=>DeleteHandler()}>Delete Account</IonButton>
        <IonButton onClick={() => setShowModal2(false)} style={{color:"white"}}>Cancel</IonButton>
      </IonModal>
        <div>
        <IonIcon md={arrowBackCircle} style={{fontSize:44,color:"#008000a8",margin:5}}
            onClick={()=>props.setAccount(true)}/>
            <IonHeader style={{ padding:"25px 0"}} className="white-background">
                <IonTitle>{username1}</IonTitle>
                <IonTitle>+91 {mobile1}</IonTitle>
                <IonTitle>{email1}</IonTitle>
                <IonButton color="success"style={{margin:"1rem"}}
                onClick={()=>updateModel1()}>Edit details</IonButton>
                </IonHeader>
                <div style={{padding:"20px"}} className="white-background">
                    <h1 style={{padding:"20px"}} className="white-background">
                        Saved Address
                   </h1>
                   <div style={{padding:"20px",paddingTop:"0"}} className="white-background">
                       <p>{user?.Address?.hno}</p>
                       <p>{user?.Address?.society}</p>
                       <p>{user?.Address?.pincode}</p>
                   </div>
                   <div>
                       <IonButton color="success" style={{margin:"1rem"}}
                        onClick={()=>{
                          if(user.username===''){
                            return History.push('/page/Login')
                            }
                          setShowModal1(true)}
                          }>Edit Address</IonButton>
                   </div>
                   <IonButton color="light" style={{margin:"1rem"}}
                   onClick={()=>{
                    if(user.username===''){
                      return History.push('/page/Login')
                      }
                     setShowModal2(true)
                     }}>DELETE ACCOUNT</IonButton>
                </div>
           </div>
        </div>
  );
};

export default withRouter(AccountPage);