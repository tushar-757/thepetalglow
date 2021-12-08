import { IonButtons, IonContent,IonSearchbar,IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonIcon } from '@ionic/react';
import React,{ useEffect, useState,Suspense } from 'react';
import { useHistory ,useLocation} from 'react-router-dom';
import './Page.css';
import { cart, notifications } from 'ionicons/icons';
import { RootStateOrAny, useSelector ,useDispatch} from 'react-redux';
import { RiWhatsappFill } from 'react-icons/ri';
import { getCurrentProduct, setFilterData} from '../Actions';
import  Home from './Home';
import LoadingBox from '../components/LoadingComponent';
const SearchBar =React.lazy(()=>import('./SearchBar'));
const MapsPage =React.lazy(()=>import('./MapsPage'));
const Cart =React.lazy(()=>import('./Cart'));
const ViewPage =React.lazy(()=>import('./ViewPage'));
const Login =React.lazy(()=>import('./Login'));
const Register =React.lazy(()=>import('./Register'));
const PaymentGategay =React.lazy(()=>import('./PaymentGateway'));
const Orders =React.lazy(()=>import('./Orders'));
const Notifications =React.lazy(()=>import('./Notifications'));
const TrackOrder =React.lazy(()=>import('./TrackOrder'));
const IndoorPage =React.lazy(()=>import('./IndoorPage'));
const OutdoorPage =React.lazy(()=>import('./OutdoorPage'));
const SeasonalPage =React.lazy(()=>import('./SeasonalPage'));
const BuyAgain =React.lazy(()=>import('./BuyAgain'));
const CustomerService =React.lazy(()=>import('./CustomerService'));
const Setting =React.lazy(()=>import('./Setting'));
const PlasticPots =React.lazy(()=>import('./PlasticPots'));
const Pebbles =React.lazy(()=>import('./Pebbles'));
const BuyAgainViewPage =React.lazy(()=>import('./BuyAgainViewPage'));
const WishList =React.lazy(()=>import('./WishList'));
const TermsandCondition =React.lazy(()=>import('../components/TermsAndConditions'));
const PrivacyPolicy =React.lazy(()=>import('../components/PrivacyPolicy'));
const ShippingPolicy =React.lazy(()=>import('../components/ShippingPolicy'));
const SoilandFertilizers =React.lazy(()=>import('./SoilandFertilizers'));
const Succulent =React.lazy(()=>import('./Succulent'));
const AboutUs =React.lazy(()=>import('../components/AboutUs'));
const EarthenPots =React.lazy(()=>import('./EarthenPots'));
const CeramicPots =React.lazy(()=>import('./CeramicPots'));
// React.lazy(() => import('./OtherComponent'));

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
                    <img src={d?.images[0]} style={{width:55}} />
                    {d.name}</IonItem>
                  </>
            ))}
            {(SearchedData.length===0)?"No Results Found":null}
            </div>:null}
            <Suspense fallback={<div><LoadingBox/></div>}>
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
         </Suspense>
        <a className="floating-whatsapp" href="#"
        onClick={()=>window.open('https://wa.me/+17278771267', '_blank')}>
         <RiWhatsappFill style={{fontSize:'48px',color:'white'}}/>
        </a>
      </IonContent>
    </IonPage>
  );
};

export default Page;


