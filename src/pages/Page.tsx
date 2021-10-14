import { IonButtons, IonContent,useIonLoading,IonSearchbar,IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonIcon } from '@ionic/react';
import React,{ useEffect, useState } from 'react';
import { Route, Router, useParams } from 'react-router';
import { useHistory ,useLocation} from 'react-router-dom';
import SearchBar from './SearchBar';
import './Page.css';
// import {Geolocation} from '@ionic-native/geolocation'
import { cart, notifications, notificationsOutline } from 'ionicons/icons';
import Home from './Home';
import {MapsPage} from './MapsPage';
// import { Geolocation } from '@capacitor/geolocation';
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
import {GetALLProducts, setFilterData} from '../Actions';


const Page:React.FC =()=>{
  const History = useHistory();
  const Location=useLocation();
  const Data=useSelector((state:RootStateOrAny)=>state.ProductReducer.Products)
  const dispatch=useDispatch();
  const [searchText, setSearchText] = useState('');
  const [SearchData,setSearchData]=useState([])
  const [locationstate,setLocationState]=useState('')
  const Items=useSelector((state:RootStateOrAny)=>state.CartReducer.items)
  const NotificationLength=useSelector((state:RootStateOrAny)=>state.NotificationReducer.Notifications)
  const [present, dismiss] = useIonLoading();
  let {OrderId}:any =useParams()

  useEffect(()=>{
    setLocationState(Location.pathname)
    },[Location.pathname])

  const ReturnName=()=>{
       return (Location.pathname==='/page/ThePetalGlow')?"ThePetalGlow":
          (Location.pathname==='/page/Cart')?"Cart":
          (Location.pathname==='/page/Login')?"Login":
          (Location.pathname==='/page/ViewPage')?"ViewPage":"ThePetalGlow"
  }

  const SearchHandler=()=>{
    setSearchData(Data.filter((data:any)=>data.name.includes(searchText)))
    dispatch(setFilterData(SearchData))
    // present({
    //   message: 'Loading...',
    //   duration:100
    // })
  }

  return (
    <IonPage>
      <IonHeader style={{backgroundColor:"#3ADF72"}}>
        <IonToolbar className="toolbar-container">
          <IonButtons slot="start">
            <IonMenuButton style={{color:"white"}}/>
          </IonButtons>
          <IonTitle class="h1-page md title-default hydrated" style={{float: 'left',color:"white",
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
           SearchHandler()}}
          color="light"
          inputMode='search'
          placeholder="search for plants,pots and gifts"
          onClick={()=>{
             dispatch(GetALLProducts())
             History.push("/page/searchbar")}}>
          </IonSearchbar>
      </IonHeader>
      <IonContent>
        {
          (locationstate==='/page/ThePetalGlow')?<Home/>:
          (locationstate==='/page/MapsPage')?<MapsPage/>:
          (locationstate==='/page/ViewPage')?<ViewPage/>:
          (locationstate==='/page/Cart')?<Cart/>:
          (locationstate==='/page/Login')?<Login/>:
          (locationstate==='/Register')?<Register/>:
          (locationstate==='/page/PaymentGateway')?<PaymentGategay/>:
          (locationstate==='/page/Orders')?<Orders/>:
          (locationstate==='/page/BuyAgain')?<Orders/>:
          (locationstate==='/page/Notifications')?<Notifications/>:
          (locationstate==='/page/IndoorPlants')?<IndoorPage/>:
          (locationstate==='/page/OutdoorPlants')?<OutdoorPage/>:
          (locationstate==='/page/SeasonalPlants')?<SeasonalPage/>:
          (locationstate==='/page/searchbar')?<SearchBar/>:
          (locationstate==='/page/TrackOrder')?<TrackOrder/>:<TrackOrder/>
        }
      </IonContent>
    </IonPage>
  );
};

export default Page;
