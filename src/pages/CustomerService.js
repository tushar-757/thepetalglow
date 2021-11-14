import { IonPage, IonContent, IonHeader,useIonToast,IonItem,IonModal,IonLabel, IonDatetime,IonInput, IonButton } from '@ionic/react';
 import { withRouter,useHistory  } from 'react-router';
 import Faq from "react-faq-component";
 import { useState } from 'react';
import './Home.css';
import IsLoggedIn from '../Hooks/isLoggedIn';
import { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { addUser} from "../Actions";
import api from '../Services/urlApi';

const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "Order Cancellation",
            content: `Once an order has been confirmed, it cannot be cancelled, refunded or exchanged.`,
        },
        {
            title: "Who can Order",
            content: `Currently we are offering services in Faridabad only,we are trying our best to reach you`,
        },
        {
            title: "Refund",
            content:
                "You will receive a refund into the source account within 5-7 days after cancelling your order if you paid by credit card, debit card, net banking, or payTM.",
        },
        {
            title: "Return / Exchange",
            content: `After delivery, ThePetalGlow does not offer a product return or exchange policy. `,
        },
        {
            title: "My Payment Has Been Debited Multiple Times",
            content: <p>We apologise for the multiple debits on your account. The extra money deducted from your bank/credit card account will be returned automatically.The time it takes to receive a refund is determined by the method of payment:
            - Online Refund: 5 to 7 business days</p>,
        },
        {
            title: "When will I receive my order?",
            content: <p>Your order will be dispatch within 1 to 2 working days ('for HomeTown only') after your transaction has been confirmed. You'll also get an order tracking number so you can keep track of your package.</p>,
        },
        {
            title: "How do I find my order details?",
            content: <p>Go to Your Orders in your ThePetalGlow account to find details for all your active orders.</p>,
        },
        {
            title: "How do I know my order has been confirmed?",
            content: <p>Once we receive your order number. You will receive an email containing the details of your order.In this email you will be provided with a unique Order ID (eg. Order 6143070faca3323a3986f090), a listing of the item(s) you have ordered.You will also be notified via email when the product(s) are shipped to you.Shipping details will be provided with the respective tracking number(s).
            </p>,
        },
        {
            title: "How do I update my ThePetalGlow account with a new delivery address?",
            content: <p>Follow these simple steps to add a new delivery address:
           <br/> 1.) Log into your ThePetalGlow account
            <br/>2.) Go to Settings > Account > Change delivery address
            <br/>3.) Fill in the information for your new address
            <br/>4.) Select 'Save Changes'
            </p>,
        },
        {
            title: "Where is my Pending order?",
            content: <p>Your orders in a pending state would get delete after 24 hours
            </p>,
        }
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "#343439",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};
const CustomerService=() => {
    const dispatch=useDispatch()
    const user1=useSelector((state)=>state.UserReducer.User)
  const [email,setEmail]=useState("")
  const [email1,setEmail1]=useState("")
  const [mobile,setMobile]=useState('')
  const [mobile1,setMobile1]=useState('')
  const [message,setMessage]=useState('')
  const [message1,setMessage1]=useState('')
  const [orderid,setOrderid]=useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [user, user_id] = IsLoggedIn();
  const user_id1=localStorage.getItem('user_id')
  const useraccesstoken=localStorage.getItem('useraccesstoken')
  const History=useHistory()
  const [loading,setLoading]=useState(false)
  const [present1, dismiss] = useIonToast();


  useEffect(() => {
    try{
      if (user != null && user_id != null) {
         const parserduser=JSON.parse(user)
          dispatch(addUser({id:parserduser.id,username:parserduser.username,
              mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
      }
    }catch(e){
      console.log(e)
    }
  },[user,user_id])
  const submitHandler=async(e)=>{
    e.preventDefault()
    try{
        if(user1.username===''){
           return History.push('/page/Login')
           }
           setLoading(true)
           const response=await api.post('/user/CustomerQueries',{
            headers:{user_id:user_id1,
                Authorization:`Bearer ${useraccesstoken}`
            },
            email:email,
            mobile:mobile,
            description:message
           },
           )
           setLoading(false)
           present1(
            {
                color: 'success',
                duration: 5000,
                message: `${response?.data?.message}`
              })
              setEmail("")
              setMessage("")
              setMobile("")
    }catch(e){
        present1(
            {
                color: 'danger',
                duration: 5000,
                message: `something went wrong:${e?.response?.data?.message}`
              })
    }
  }
  const submitBugHandler=async(e)=>{
    e.preventDefault()
    try{
        if(user1.username===''){
           return History.push('/page/Login')
           }
           setLoading(true)
           const response=await api.post('/user/ReportBug',{
            headers:{user_id:user_id1,
                Authorization:`Bearer ${useraccesstoken}`
            },
            email:email1,
            mobile:mobile1,
            description:message1
           },
           )
           setLoading(false)
           present1(
            {
                color: 'success',
                duration: 5000,
                message: `${response?.data?.message}`
              })
              setEmail("")
              setMessage("")
              setMobile("")
              setShowModal2(false)
    }catch(e){
        present1(
            {
                color: 'danger',
                duration: 5000,
                message: `something went wrong:${e?.response?.data?.message}`
              })
    }
  }
  const UpdateDateHandler=async (e)=>{
    e.preventDefault()
      try{
           setLoading(true)
           const response=await api.put('/user/UpdateUserOrderDate',{
            headers:{user_id:user_id1,
                order_id:orderid,
                Authorization:`Bearer ${useraccesstoken}`
            },
            date:selectedDate,
           },
        )
           setLoading(false)

           present1(
            {
                color: 'success',
                duration: 5000,
                message: `${response?.data?.message}`
              })
           setShowModal(false)
      }catch(e){
          setLoading(false)
          setShowModal(false)
          present1(
            {
                color: 'danger',
                duration: 5000,
                message: `something went wrong:${e?.response?.data?.message}`
              })
      }
  }
  return (
    <IonPage>
      <IonContent>
      <IonModal isOpen={showModal1} cssClass='my-custom-class' backdropDismiss={false}>
          <form onSubmit={(e)=>UpdateDateHandler(e)}>
                             <IonInput placeholder="enter orderid here.." value={orderid} onIonChange={(e)=>setOrderid(e.target.value)} style={{marginBottom:"5px"}} required/>
                             <IonItem>
                             <IonLabel>MM DD</IonLabel>
                                 <IonDatetime displayFormat="MM DD" placeholder="Select Date" value={selectedDate}
                                         min={new Date().toISOString()} onIonChange={e => setSelectedDate(e.target.value)}></IonDatetime>
                             </IonItem>
                            <IonButton type="submit" style={{color:"white"}}>Update</IonButton>
                            <IonButton onClick={()=>setShowModal1(false)} style={{color:"white"}}>Close</IonButton>
                            </form>
      </IonModal>
      <IonModal isOpen={showModal2} cssClass='my-custom-class' backdropDismiss={false}>
             <form onSubmit={(e)=>submitBugHandler(e)}>
                <IonInput placeholder="registerd email" value={email1} onIonChange={(e)=>setEmail1(e.target.value)} style={{marginBottom:"5px"}} required/>
                        <IonInput placeholder="Mobile no." type="number" value={mobile1} onIonChange={(e)=>setMobile1(e.target.value)} style={{marginBottom:"15px"}} required/>
                        <textarea placeholder="write your message here..."
                        style={{    border: 'none',
                        outline:"none",
                        resize:"none",
                            background: '#313433',
                        borderRradius: '5px',
                               color: '#ffffff'}}
                        value={message1}  onChange={(e)=>setMessage1(e.target.value)} rows="8" cols="40" required/>
                        <IonButton type="submit" style={{color:"white"}}>Submit</IonButton>
                        <IonButton onClick={()=>setShowModal2(false)} style={{color:"white"}}>Close</IonButton>
                            </form>
      </IonModal>
          <div style={{padding:'10px'}} className="white-background">
              <div style={{marginBottom:"3rem"}}>
                  <h1>Change Delivery Date/time</h1>
                               <IonButton style={{color:"white"}}
                               onClick={()=>setShowModal1(true)}>SET</IonButton>
              </div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            <div>
                <h1>Still Need Help?</h1>
                <div>
                    <form onSubmit={(e)=>submitHandler(e)}>
                        <IonInput placeholder="registerd email" value={email} onIonChange={(e)=>setEmail(e.target.value)}
                         style={{marginBottom:"5px"}}
                         autocomplete={true}
                          required/>
                        <IonInput placeholder="Mobile no." type="number" value={mobile} onIonChange={(e)=>setMobile(e.target.value)}
                        style={{marginBottom:"15px"}}
                        autocomplete={true}
                        required/>
                        <textarea placeholder="write your message here..."
                        style={{    border: 'none',
                        outline:"none",
                        resize:"none",
                            background: '#313433',
                        borderRradius: '5px',
                               color: '#ffffff'}}
                        value={message}  onChange={(e)=>setMessage(e.target.value)} rows="8" cols="35" required/>
                        <div>
                        <IonButton type="submit" style={{color:"white"}}
                       >Submit</IonButton>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <IonButton color="warning" onClick={()=>setShowModal2(true)}>Report A Bug</IonButton>
            </div>
        </div>
           </IonContent>
        </IonPage>
  );
};

export default withRouter(CustomerService);