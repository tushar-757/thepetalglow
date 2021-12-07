import { IonButtons, IonContent,IonSearchbar,IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonIcon } from '@ionic/react';
import React,{ useEffect, useState } from 'react';
import { useHistory ,useLocation} from 'react-router-dom';
import SearchBar from './SearchBar';
import './Page.css';
import { cart, notifications } from 'ionicons/icons';
import Home from './Home';
import {MapsPage} from './MapsPage';
import ViewPage from './ViewPage';
import Cart from './Cart';
import { RootStateOrAny, useSelector ,useDispatch} from 'react-redux';
import Login from './Login';
import Register from './Register';
import PaymentGategay from './PaymentGateway';
import Orders from './Orders';
import Notifications from './Notifications';
import TrackOrder from './TrackOrder';
import IndoorPage from './IndoorPage';
import OutdoorPage from './OutdoorPage';
import SeasonalPage from './SeasonalPage';
import { getCurrentProduct, setFilterData} from '../Actions';
import BuyAgain from './BuyAgain';
import CustomerService from './CustomerService';
import Setting from './Setting';
import PlasticPots from './PlasticPots';
import Pebbles from './Pebbles';
import { RiWhatsappFill } from 'react-icons/ri';
import BuyAgainViewPage from './BuyAgainViewPage';
import WishList from './WishList';
import TermsandCondition from '../components/TermsAndConditions';
import PrivacyPolicy from '../components/PrivacyPolicy';
import ShippingPolicy from '../components/ShippingPolicy';
import SoilandFertilizers from './SoilandFertilizers';
import Succulent from './Succulent';
import AboutUs from '../components/AboutUs';
import EarthenPots from './EarthenPots';
import CeramicPots from './CeramicPots';

const Page:React.FC =(props)=>{
  const History = useHistory();
  const Location=useLocation();
  const Data=useSelector((state:RootStateOrAny)=>state.ProductReducer.Products)
  const dispatch=useDispatch();
  const [searchText, setSearchText] = useState('');
  const [SearchData,setSearchData]=useState([])
  const [locationstate,setLocationState]=useState('')
  const Items=useSelector((state:RootStateOrAny)=>state.CartReducer.items)
  const NotificationLength=useSelector((state:RootStateOrAny)=>state.NotificationReducer.Notifications)
  const SearchedData=useSelector((state:RootStateOrAny)=>state.ProductReducer.FilterData)
  const [search,setSearch]=useState(false)


  useEffect(()=>{
    setLocationState(Location.pathname)
    },[Location.pathname])

  const ReturnName=()=>{
       return (Location.pathname==='/page/ThePetalGlow')?"ThePetalGlow":
          (Location.pathname==='/page/Cart')?"Cart":
          (Location.pathname==='/page/Login')?"Login":
          (Location.pathname==='/page/ViewPage')?"ThePetalGlow":"ThePetalGlow"
  }

  // useEffect(()=>{
  //   dispatch(GetALLProducts())
  // },[])
  const SearchHandler=()=>{
    setSearchData(Data.filter((data:any)=>data.name.toLowerCase().includes(searchText.toLowerCase())))
    dispatch(setFilterData(SearchData))
  }
useEffect(()=>{
  SearchHandler()
},[searchText])
  return (
    <IonPage>
      <IonHeader style={{backgroundColor:"#28b156"}} >
        <IonToolbar className="toolbar-container"  onClick={()=>{
                  setSearch(false)
                 }}>
          <IonButtons slot="start">
            <IonMenuButton style={{color:"white"}}/>
          </IonButtons>
          <IonTitle class="animate__animated animate__flash  h1-page md title-default hydrated" style={{float: 'left',color:"white",
    width: '72%',
    padding:'4px'}}>{ReturnName()}</IonTitle>
          <IonButtons style={{width:'25%',
    display:'flex',
    justifyContent:"flex-end",
    alignItems:'center'}}>
            <div style={{position:"relative"}} onClick={()=>History.push("/page/Notifications")}>
          <IonIcon slot="start"  style={{color:"white",fontSize:25}} md={notifications}/>
          <p className="cart-item-length">{NotificationLength?.length}</p>
            </div>
          <div style={{position:"relative"}} onClick={()=>History.push("/page/Cart")}>
          <IonIcon slot="start"  style={{color:"white",fontSize:30}} md={cart} />
          <p className="cart-item-length">{Items?.length}</p>
            </div>
          </IonButtons>
        </IonToolbar>
          <IonSearchbar value={searchText}
          onIonChange={(e) =>{
          setSearchText(e.detail.value!)
          }}
          color="light"
          inputMode='search'
          placeholder="search for plants,pots and gifts"
          onClick={()=>{
            setSearch(true)}}>
          </IonSearchbar>
      </IonHeader>
      <IonContent  onClick={()=>setSearch(false)}>
        {(search)?<div className="search-block" >
          {SearchedData?.map((d:any)=>(
            <>
              <IonItem onClick={()=>{
                  dispatch(getCurrentProduct(d?._id))
                  setSearch(false)
                  History.push("/page/ViewPage")}} style={{color:"black"}}>
                    {console.log(d)}
                    <img src={d?.images[0]} style={{width:55}} />
                    {d.name}</IonItem>
                  </>
            ))}
            {(SearchedData.length===0)?"No Results Found":null}
            </div>:null}

        {
          (locationstate==='/page/ThePetalGlow')?<Home/>:
          (locationstate==='/page/MapsPage')?<MapsPage/>:
          (locationstate==='/page/ViewPage')?<ViewPage/>:
          (locationstate==='/page/Cart')?<Cart/>:
          (locationstate==='/page/Login')?<Login/>:
          (locationstate==='/Register')?<Register/>:
          (locationstate==='/page/PaymentGateway')?<PaymentGategay/>:
          (locationstate==='/page/IndoorPlants')?<IndoorPage/>:
          (locationstate==='/page/OutdoorPlants')?<OutdoorPage/>:
          (locationstate==='/page/SeasonalPlants')?<SeasonalPage/>:
          (locationstate==='/page/SucculentPlants')?<Succulent/>:
          (locationstate==='/page/PlasticPots')?<PlasticPots/>:
          (locationstate==='/page/Pebbles')?<Pebbles/>:
          (locationstate==='/page/EarthenPots')?<EarthenPots/>:
          (locationstate==='/page/CeramicPots')?<CeramicPots/>:
          (locationstate==='/page/SoilandFertilizers')?<SoilandFertilizers/>:
          (locationstate==='/page/searchbar')?<SearchBar/>:
          (locationstate==='/page/BuyAgainOrder')?<BuyAgainViewPage/>:
          (locationstate==='/page/Orders')?<Orders/>:
          (locationstate==='/page/BuyAgain')?<BuyAgain/>:
          (locationstate==="/page/MyWishList")?<WishList/>:
          (locationstate==='/page/Notifications')?<Notifications/>:
          (locationstate==='/page/Settings')?<Setting/>:
          (locationstate==='/page/Customer Service')?<CustomerService/>:
          (locationstate===`/page/TrackOrder`)?<TrackOrder/>:
          (locationstate==='/page/ThePetalGlow/PrivacyPolicy')?<PrivacyPolicy/>:
          (locationstate==='/page/ThePetalGlow/TermsandCondition')?<TermsandCondition/>:
          (locationstate==='/page/ThePetalGlow/ShippingPolicy')?<ShippingPolicy/>:
          (locationstate==='/page/ThePetalGlow/AboutUs')?<AboutUs/>:
          <TrackOrder/>
        }
        <a className="floating-whatsapp" href="#"
        onClick={()=>window.open('https://wa.me/+17278771267', '_blank')}>
         <RiWhatsappFill style={{fontSize:'48px',color:'white'}}/>
        </a>
      </IonContent>
    </IonPage>
  );
};

export default Page;
