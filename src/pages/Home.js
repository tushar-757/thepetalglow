import { IonPage,IonSlide,IonSlides, IonContent, IonRefresher, IonRefresherContent, IonIcon, IonFooter, IonHeader, IonButton } from '@ionic/react';
import { location,logoFacebook,logoInstagram,logoYoutube,logoLinkedin} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { RefresherEventDetail } from '@ionic/core';
 import { withRouter  } from 'react-router';
 import IsLoggedIn from '../Hooks/isLoggedIn';
import { useSelector } from 'react-redux';
import './Home.css';
import BestSelling from './BestSelling';
import ShopByCategory from './ShopByCategory';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct,addUser,SETBESTSELLING} from "../Actions";
import TPGLOGO from '../static/TPGLOGO.png';
import {RiSecurePaymentFill} from 'react-icons/ri'
import {FaTruck} from 'react-icons/fa'
import {FiHelpCircle} from 'react-icons/fi'
import LoadingBox from '../components/LoadingComponent';
import { Input } from '@material-ui/core';
import api from '../Services/urlApi';


const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const ImageBar=({images})=>{
  return(
    <IonSlides pager={true} options={slideOpts}  className="Home-SlideBar">
      <IonSlide>
      <iframe  className="Home-Player"  autoplay="autoplay" src="https://www.youtube.com/embed/_EB-qSLTCXQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </IonSlide>
    {images.map((data,i)=>(
      <IonSlide  style={{backgroundColor:"white"}}>
         <img src={data} style={{width:"100%"}}className="Home-SlideBar-Img" />
      </IonSlide>
    ))}
    </IonSlides>

  )}
const Home=() => {
  const History = useHistory();
  const dispatch=useDispatch()
  const images=useSelector((state)=>state.HomeReducer.images)
  const [user, user_id] = IsLoggedIn();
  const [email,setSubscribeEmail]=useState("")
  const Loading=useSelector((state)=>state.NotificationReducer.Loading)
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

     function doRefresh(RefresherEventDetail) {
      dispatch(FetchSeasonalProduct())
      dispatch(FetchIndoorProduct())
      dispatch(FetchOutdoorProduct())
      dispatch(FetchPlantersProduct())
      dispatch(SETBESTSELLING())
      setTimeout(() => {
        console.log('Async operation has ended');
        RefresherEventDetail.detail.complete();
      }, 2000);
    }

    const SubscribeEmailHandler=async()=>{
      try{
         const response=await api.post("/subscribeme",{email:email})
      }catch(e){
         alert(e)
      }
    }
  return (
    (Loading)?
    <>
       <LoadingBox/>
    </>:
    <IonPage>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent>
        </IonRefresherContent>
           </IonRefresher>
          <div className="select-location" onClick={()=>History.push("/page/MapsPage")}>
          <IonIcon slot="start"  md={location} style={{color:'#009688'}}/>
              <h1 className="h1-home" style={{color:"white"}}>select your location</h1>
          </div>
          <div className="select-location">
              <h1 className="h1-home" style={{padding:10}}>Currently Services are only available in  Faridabad</h1>
          </div>
          <ShopByCategory/>
           <ImageBar images={images}/>
           {/* <div className="white-background">
             <h1 className="BestSellingTitle">Best Seasonals</h1>
           </div>
           <BestSelling/>
           <div className="white-background">
             <h1 className="BestSellingTitle">Festival Sale</h1>
           </div>
           <FestivalSale/> */}
           <div className="white-background">
             <h1 className="animate__animated animate__wobble animate_infinite BestSellingTitle">Best Selling Items</h1>
           </div>
            <BestSelling/>
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
                        <div style={{marginTop:"0"}}>
                          <FiHelpCircle style={{fontSize:"40px"}}/>
                        </div>
                         Lifetime Support</div>
                  </div>
               <IonHeader className="footer-header-home">
                 <img  className="footer-header-image"src={TPGLOGO}/>
               </IonHeader>
                <div style={{marginBottom:"2rem"}}>
                  <div className="follow-us-title">Follow Us</div>
                  <div className="footer-icon-block">
                  <IonIcon slot="start"  md={logoFacebook}  className="footer-icon" style={{color:'cornflowerblue'}}/>
                  <a href="https://www.instagram.com/thepetalglow/"><IonIcon slot="start"  md={logoInstagram} style={{color:'rgb(58, 223, 114);'}} className="footer-icon"/></a>
                  <a href="https://www.youtube.com/watch?v=_EB-qSLTCXQ"><IonIcon slot="start"  md={logoYoutube} className="footer-icon" style={{color:'red'}}/></a>
                  <IonIcon slot="start"  md={logoLinkedin} className="footer-icon" style={{color:'blue'}}/>
                    </div>
                </div>
           </IonFooter>
                    <div className="footer-newsletter">
                         <p style={{marginLeft:"15px",padding:"35px",paddingBottom:"0px"}}>Subscribe to recieve news and coupons</p>
                         <div className="footer-newsletter-inner">
                           <div style={{width:"80%"}}>
                           <input placeholder="email" style={{background:"white",color:'black',border:'none',
                        width:"99%", padding: '10px'}} type="text" value={email} onChange={(e)=>setSubscribeEmail(e.target.value)}/>
                           </div>
                           <div style={{width:"40%"}}>
                             <IonButton color="light" onClick={()=>SubscribeEmailHandler()}>Subscribe</IonButton>
                           </div>
                           </div>
                           <div style={{margin:"2rem",marginTop:"0",marginBottom:"0",paddingBottom:"0",padding:"20px"}}>
                                Contact us:<br></br>
                                email:services@thepetalglow.com<br></br>
                                Phone:+17278771267 (`whatsapp chat available only`)
                             </div>
                             <div style={{margin:"2rem",marginTop:"0px",padding:"20px"}}>
                                  <h3>Our Policies</h3>
                                  <div style={{display:"flex",flexDirection:"column"}}>
                                    <a style={{color:"black"}} onClick={()=>History.push("/page/ThePetalGlow/PrivacyPolicy")}>Privacy Policy</a>
                                    <a style={{color:"black"}}>Shipping and Return Policy</a>
                                    <a style={{color:"black"}} onClick={()=>History.push("/page/ThePetalGlow/TermsandCondition")}>Terms and conditions</a>
                                    </div>
                             </div>
                    </div>
           </IonContent>
        </IonPage>
  );
};

export default withRouter(Home);