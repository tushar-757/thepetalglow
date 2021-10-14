import { IonPage,IonSlide,IonSlides, IonContent, IonIcon, IonFooter, IonHeader } from '@ionic/react';
import { location,logoFacebook,logoInstagram,logoYoutube,logoLinkedin} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
 import { withRouter  } from 'react-router';
 import IsLoggedIn from '../Hooks/isLoggedIn';
import { useSelector } from 'react-redux';
import './Home.css';
import BestSelling from './BestSelling';
import ShopByCategory from './ShopByCategory';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addUser,SETBESTSELLING} from "../Actions";
import TPGLOGO from '../static/TPGLOGO.png';

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const ImageBar=({images})=>{
  return(
    <IonSlides pager={true} options={slideOpts}  className="Home-SlideBar">
    {images.map(data=>(
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
  const BestSellingData=useSelector((state)=>state.ProductReducer.Product)
  const SeasonalPlants=useSelector((state)=>state.HomeReducer.SeasonalPlants)
  const BestSelling1=useSelector((state)=>state.ProductReducer.BestSellingData)
  const [user, user_id] = IsLoggedIn();

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

     useEffect(()=>{
      dispatch(SETBESTSELLING())
     },[BestSelling1])

  return (
    <IonPage>
      <IonContent>
          <div className="select-location" onClick={()=>History.push("/page/MapsPage")}>
          <IonIcon slot="start"  md={location} style={{color:'#009688'}}/>
              <h1 className="h1-home" style={{color:"white"}}>select your location</h1>
          </div>
          <div className="select-location">
              <h1 className="h1-home" style={{padding:10}}>Currently Services are only available in  Faridabad</h1>
          </div>
          <ShopByCategory/>
           <ImageBar images={images}/>
           <div>
             <h1 className="BestSellingTitle">Best Selling Items</h1>
           </div>
            <BestSelling data={BestSelling1}/>
           <IonFooter>
               <IonHeader className="footer-header-home">
                 <img  className="footer-header-image"src={TPGLOGO}/>
               </IonHeader>
                <div style={{marginBottom:"2rem"}}>
                  <div>

                  </div>
                  <div className="follow-us-title">Follow Us</div>
                  <div className="footer-icon-block">
                  <IonIcon slot="start"  md={logoFacebook}  className="footer-icon"/>
                  <a href="https://www.instagram.com/thepetalglow/"><IonIcon slot="start"  md={logoInstagram}  className="footer-icon"/></a>
                  <IonIcon slot="start"  md={logoYoutube} className="footer-icon"/>
                  <IonIcon slot="start"  md={logoLinkedin} className="footer-icon"/>
                    </div>
                </div>
           </IonFooter>
           </IonContent>
        </IonPage>
  );
};

export default withRouter(Home);