import { IonButtons, IonContent,useIonLoading,IonSearchbar,IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonIcon, IonList } from '@ionic/react';
import React,{ useEffect, useState } from 'react';
import { Route, Router, useParams } from 'react-router';
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
import {GetALLProducts, getCurrentProduct, setFilterData,setMenuIndex} from '../Actions';
import BuyAgain from './BuyAgain';
import CustomerService from './CustomerService';
import Setting from './Setting';
import PlasticPots from './PlasticPots';
import Pebbles from './Pebbles';
import { RiWhatsappFill } from 'react-icons/ri';

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
  const SearchedData=useSelector((state:RootStateOrAny)=>state.ProductReducer.FilterData)
  const [search,setSearch]=useState(false)

  useEffect(()=>{
    setLocationState(Location.pathname)
    },[Location.pathname])

  const ReturnName=()=>{
       return (Location.pathname==='/page/ThePetalGlow')?"ThePetalGlow":
          (Location.pathname==='/page/Cart')?"Cart":
          (Location.pathname==='/page/Login')?"Login":
          (Location.pathname==='/page/ViewPage')?"ViewPage":"ThePetalGlow"
  }

  useEffect(()=>{
    dispatch(GetALLProducts())
  },[])
  const SearchHandler=()=>{
    const searchconvertibletext=searchText
    setSearchData(Data.filter((data:any)=>data.name.toLowerCase().includes(searchText.toLowerCase())))
    dispatch(setFilterData(SearchData))
    // present({
    //   message: 'Loading...',
    //   duration:100
    // })
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
              <IonItem onClick={()=>{
                  dispatch(getCurrentProduct(d._id))
                  setSearch(false)
                  History.push("/page/ViewPage")}} style={{color:"black"}}>{d.name}</IonItem>
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
          (locationstate==='/page/Orders')?<Orders/>:
          (locationstate==='/page/BuyAgain')?<BuyAgain/>:
          (locationstate==='/page/Notifications')?<Notifications/>:
          (locationstate==='/page/IndoorPlants')?<IndoorPage/>:
          (locationstate==='/page/OutdoorPlants')?<OutdoorPage/>:
          (locationstate==='/page/SeasonalPlants')?<SeasonalPage/>:
          (locationstate==='/page/PlasticPots')?<PlasticPots/>:
          (locationstate==='/page/Pebbles')?<Pebbles/>:
          (locationstate==='/page/Customer Service')?<CustomerService/>:
          (locationstate==='/page/Settings')?<Setting/>:
          (locationstate==='/page/searchbar')?<SearchBar/>:
          (locationstate==='/page/TrackOrder')?<TrackOrder/>:<TrackOrder/>
        }
        <a className="floating-whatsapp" href="https://wa.me/+918700912996">
         <RiWhatsappFill style={{fontSize:'59px',color:'#4ced69'}}/>
        </a>
      </IonContent>
    </IonPage>
  );
};

export default Page;
