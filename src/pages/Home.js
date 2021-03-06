import { IonPage,IonSlide,IonList,IonListHeader,IonSlides,IonModal, IonContent,useIonToast,IonRefresher, IonRefresherContent, IonIcon, IonFooter, IonHeader, IonButton, IonItem } from '@ionic/react';
import { location,logoFacebook,logoInstagram,logoYoutube,logoLinkedin} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Marquee from "react-fast-marquee";
 import { withRouter  } from 'react-router';
 import IsLoggedIn from '../Hooks/isLoggedIn';
import { useSelector } from 'react-redux';
import './Home.css';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct,addUser,SETBESTSELLING} from "../Actions";
import TPGLOGO from '../static/TPGLOGO.png';
import Image1 from '../static/mix3infibre.jpg';
import Image2 from '../static/mix2infibre.jpg';
import Image3 from '../static/mixinfibre.jpg';
import Image4 from '../static/fibre5.jpeg';
import Image5 from '../static/fibre7.jpeg';
import Image6 from '../static/fibre8.jpeg';
import qrcodewhatsapp from '../static/whatsappqr.jpg'
import {RiSecurePaymentFill} from 'react-icons/ri'
import {FaTruck} from 'react-icons/fa'
import {FiHelpCircle} from 'react-icons/fi'
import LoadingBox from '../components/LoadingComponent';
import api from '../Services/urlApi';
import Logo from '../static/favicon.png'
import Header from '../components/Header';
import { RiWhatsappFill } from 'react-icons/ri';
import BestSelling from'./BestSelling';
import ShopByCategory from'./ShopByCategory';
import payments from '../static/payments.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import GoogleMap from '../components/MapsContainer';
import {AiFillInfoCircle, AiOutlineUser} from 'react-icons/ai'
import axios from 'axios';


const slideOpts = {
  initialSlide: 0,
  speed: 400,
  // autoplay:true
};
function PopoverList({ onHide }){
  return (
 <IonList>
   <IonListHeader>Terms&Conditions applied</IonListHeader>
   <IonItem button>dates may vary but we will try our best to come  on time</IonItem>
 </IonList>
)}
const ImageBar=()=>{
  return(
    <IonSlides pager={true} options={slideOpts}  className="Home-SlideBar">
      <IonSlide  style={{backgroundColor:"white"}} >
         <img
           alt='Home1'
           src="https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image1.webp"
           width='100%'
           className="Home-SlideBar-Img"
           />
      </IonSlide>
      <IonSlide>
      <img
           alt='Home2'
           src="https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image2.webp"
           width='100%'
           className="Home-SlideBar-Img"
           />
      </IonSlide>
      <IonSlide>
      {/* <span className="image1-tag">kokedama's Coming soon...</span> */}
      <img
           alt='Home3'
           src="https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image3.webp"
           width='100%'
           className="Home-SlideBar-Img"
           />
      </IonSlide>
      <IonSlide>
      <img
           alt='Home4'
           src="https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image4.webp"
           width='100%'
           className="Home-SlideBar-Img"
           />
      </IonSlide>
    </IonSlides>

  )}
const Home=() => {
  const History = useHistory();
  const dispatch=useDispatch()
  const [user, user_id] = IsLoggedIn();
  const [email,setSubscribeEmail]=useState("")
  const [present, dismiss] = useIonToast();
  const loading=useSelector((state)=>state.ProductReducer.loading)
  const user_id1=localStorage.getItem('user_id')
  const useraccesstoken=localStorage.getItem('useraccesstoken')
  const [showModal, setShowModal] = useState(false);
  const User=useSelector((state)=>state.UserReducer)

    useEffect(() => {
      try{
        if (user != null && user_id != null) {
           const parserduser=JSON.parse(user)
            dispatch(addUser({id:parserduser.id,username:parserduser.username,
                mobile:parserduser.mobile,email:parserduser.email,Address:parserduser.Address}))
        }
      }catch(e){
        present(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${e}`
            })
      }
    },[user,user_id])

     function doRefresh(RefresherEventDetail) {
      dispatch(FetchSeasonalProduct())
      dispatch(FetchIndoorProduct())
      dispatch(FetchOutdoorProduct())
      dispatch(FetchPlantersProduct())
      dispatch(SETBESTSELLING())
      setTimeout(() => {
        RefresherEventDetail.detail.complete();
      }, 2000);
    }

    const SubscribeEmailHandler=async(e)=>{
      e.preventDefault();
      try{
         const response=await api.post("/user/Subscribe",{
          headers:{user_id1,Authorization:`Bearer ${useraccesstoken}`},
          email:email})
         present(
          {
              color: 'success',
              duration: 2000,
              message: `${response?.data?.message}`
            })
      }catch(e){
         present(
          {
              color: 'danger',
              duration: 5000,
              message: `something went wrong:${(e?.response?.data?.message)?e?.response?.data?.message:e?.response?.data}`
            })
      }
    }

  return (
    <>
    <IonPage>
      <Header/>
      <IonContent>
      <IonModal isOpen={showModal} cssClass='my-custom-class' style={{overflowY:"scroll"}} backdropDismiss={false}>
          {/* <form onSubmit={(e)=>BookHandler(e)}> */}
            <IonItem>
              <p>
                Please send us your email,phone and location we will get back to you in 24 hours
                </p>
            </IonItem>
                <IonItem>
                <a href="https://wa.me/message/JUSRENBGPF4ZN1">https://wa.me/message/JUSRENBGPF4ZN1</a>
                </IonItem>
                             <div style={{display:'flex',justifyContent:"center"}}>
                               <img src={qrcodewhatsapp} style={{height:'160px',width:'178px'}}/>
                             </div>
                            <IonButton onClick={()=>setShowModal(false)} style={{color:"white"}}>Close</IonButton>
                            {/* </form> */}
      </IonModal>
        <IonItem>
       <Marquee className="top-message" speed={40} gradient={false}>
        As per our same day delivery Policy currently we are offering services only in Faridabad,we are trying our best to reach you.Please do not order if you are residing outside faridabad
       </Marquee>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent>
        </IonRefresherContent>
           </IonRefresher>
        </IonItem>
          <div className="select-location" onClick={()=>History.push("/page/MapsPage")}>
          <IonIcon slot="start"  md={location} style={{color:'white'}}/>
              <h1 className="h1-home">select your location</h1>
          </div>
          <div className="select-location">
              <h1 className="h1-home" style={{padding:10}}>Currently Services are only available in  Faridabad</h1>
          </div>
          <ShopByCategory/>
           {/* <ImageBar/> */}
           <div className="white-background">
             <h1 className="BestSellingTitle" style={{fontSize:'15px',margin:'2rem'}}>Complete Office/Restaurant/Company/Mall Setup</h1>
           </div>
             <div>
              <Carousel>
             <div className='setup1'>
               <img src={Image1}/>
               </div>
             <div className='setup1'>
               <img src={Image2}/>
               </div>
             <div className='setup1'>
               <img src={Image3}/>
               </div>
             <div className='setup1'>
               <img src={Image4}/>
               </div>
             <div className='setup1'>
               <img src={Image5}/>
               </div>
             <div className='setup1'>
               <img src={Image6}/>
               </div>
           </Carousel>
           <div style={{display:"flex",justifyContent:'center'}}>
                <IonButton color="success"  onClick={()=>setShowModal(true)}>Book A visit</IonButton>
             </div>
           </div>
           {/* <section>
           <div className="white-background">
             <h1 className="BestSellingTitle" style={{fontSize:'15px',margin:'2rem'}}>New Arrivals!!</h1>
           </div>
             <ul>
             <li className='setup1'>
               <img src={Image1}/>
               </li>
             <li className='setup1'>
               <img src={Image2}/>
               </li>
             <li className='setup1'>
               <img src={Image3}/>
               </li>
             <li className='setup1'>
               <img src={Image4}/>
               </li>
             <li className='setup1'>
               <img src={Image5}/>
               </li>
             <li className='setup1'>
               <img src={Image6}/>
               </li>
           </ul>
           </section> */}
           <div className="white-background">
             <h1 className="BestSellingTitle" style={{fontSize:'18px',margin:'2rem'}}>Best Selling Items</h1>
           </div>
           {(loading)? <>
            <LoadingBox/>
            </>:
            <BestSelling/>}
           <IonFooter className="white-background">
                  <div className="policy-div">
                      <div className="policy-divs">
                        <div>
                           <RiSecurePaymentFill style={{fontSize:"40px"}}/>
                           </div>
                        100% Secure Payment</div>
                      <div className="policy-divs">
                      <div>
                           <FaTruck style={{fontSize:"40px"}}/>
                           </div>
                      Secure Same Day Delievery</div>
                      <div className="policy-divs">
                        <div style={{margin:"1rem"}}>
                          <FiHelpCircle style={{fontSize:"40px"}}/>
                        </div>
                         Lifetime<br></br>Support</div>
                  </div>
               <IonHeader className="footer-header-home">
                 <img  className="footer-header-image"src={TPGLOGO}/>
               </IonHeader>
                <div style={{marginBottom:"2rem"}}>
                  <div className="follow-us-title">Follow Us</div>
                  <div className="footer-icon-block">
                  <IonIcon slot="start"  md={logoFacebook}  className="footer-icon facebook" />
                  <a href="https://www.instagram.com/thepetalglow/"><IonIcon slot="start"  md={logoInstagram} className="footer-icon insta"/></a>
                  <a href="https://www.youtube.com/watch?v=_EB-qSLTCXQ"><IonIcon slot="start"  md={logoYoutube} className="footer-icon youtube" /></a>
                  <IonIcon slot="start"  md={logoLinkedin} className="footer-icon linkdin"/>
                    </div>
                </div>
           </IonFooter>
                    <div className="footer-newsletter">
                         <p style={{margin:"0px",padding:"30px",paddingBottom:"0px"}}>Subscribe to recieve news and coupons</p>
                         <div className="footer-newsletter-inner">
                             <form onSubmit={(e)=>SubscribeEmailHandler(e)} style={{display:"flex",width:"100%"}}>
                           <div className="EmailInput">
                           <input placeholder="email"
                            style={{background:"white",color:'black',border:'none',outline:"none",
                            width:"99%", padding: '10px'}}
                             type="email"
                              value={email}
                              onChange={(e)=>setSubscribeEmail(e.target.value)}
                              required/>
                           </div>
                           <div style={{width:"40%"}}>
                             <IonButton color="light"
                             type="submit">Subscribe</IonButton>
                           </div>
                            </form>
                           </div>
                           <div className="BottomLine">
                                <h3 style={{margin:"0",color: 'white'}}>About us</h3>
                                <a style={{color:'white'}} onClick={()=>History.push("/page/ThePetalGlow/AboutUs")}>https://thepetalglow.com/AboutUs</a>
                             </div>
                           <div className="BottomLine">
                                <h3 style={{margin:"0",color: 'white'}}>Contact us</h3>
                                <a style={{color:'white'}} onClick={()=>History.push("/page/ThePetalGlow/ContactUs")}>https://thepetalglow.com/ContactUs</a>
                             </div>
                             <div className="BottomLine">
                                  <h3 style={{margin:"0",color: 'white'}}>Our Policies</h3>
                                  <div style={{display:"flex",flexDirection:"column"}}>
                                    <a style={{color:"white"}} onClick={()=>History.push("/page/ThePetalGlow/PrivacyPolicy")}>Privacy Policy</a>
                                    <a style={{color:"white"}} onClick={()=>History.push("/page/ThePetalGlow/ShippingPolicy")}>Shipping and Return Policy</a>
                                    <a style={{color:"white"}} onClick={()=>History.push("/page/ThePetalGlow/TermsandCondition")}>Terms and conditions</a>
                                    </div>
                             </div>
                             <div style={{margin:"1rem",display:'flex'}}>
                               <div style={{position:"relative"}}>
                                All rights reserved <span style={{color:"#ffeb3b"}}>??</span> 2021 | thepetalglow.com
                               <div className="home-image">
                                 <img src={Logo}/>
                                 </div>
                               <div className="home-image1">
                                <img src={payments}/>
                                 </div>
                                </div>
                             </div>
                    </div>
                    <a className="floating-whatsapp" href="#"
        onClick={()=>window.open('https://wa.me/+17278771267', '_blank')}>
         <RiWhatsappFill style={{fontSize:'48px',color:'white'}}/>
        </a>
           </IonContent>
        </IonPage>
        </>
  );
};

export default withRouter(Home);