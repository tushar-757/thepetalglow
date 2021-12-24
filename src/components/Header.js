import { cart, notifications } from 'ionicons/icons';
import { IonButtons, IonContent, IonItem,IonSearchbar,IonHeader, IonMenuButton,  IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useSelector,useDispatch} from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { getCurrentProduct, setFilterData} from '../Actions';

export default function Header(){
    const History = useHistory();
    const NotificationLength=useSelector((state)=>state.NotificationReducer.Notifications)
    const SearchedData=useSelector((state)=>state.ProductReducer.FilterData)
    const Items=useSelector((state)=>state.CartReducer.items)
    const Data=useSelector((state)=>state.ProductReducer.Products)
    const [search,setSearch]=useState(false)
    const dispatch=useDispatch();
    const [searchText, setSearchText] = useState('');
    const [SearchData,setSearchData]=useState([])
    const Location=useLocation();

    const ReturnName=()=>{
        return (Location.pathname==='/page/ThePetalGlow')?"ThePetalGlow":
           (Location.pathname==='/page/Cart')?"Cart":
           (Location.pathname==='/page/Login')?"Login":
           (Location.pathname==='/page/ViewPage')?"ThePetalGlow":"ThePetalGlow"
   }

   const SearchHandler=()=>{
    setSearchData(Data.filter((data)=>data.name.toLowerCase().includes(searchText.toLowerCase())))
    dispatch(setFilterData(SearchData))
  }
useEffect(()=>{
  SearchHandler()
},[searchText])
    return (
        <>
        <IonHeader >
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
          style={{backgroundColor:"#008000a8"}}
          onIonChange={(e) =>{
          setSearchText(e.detail.value)
          }}
          color="light"
          inputMode='search'
          placeholder="search for plants,pots and gifts"
          onClick={()=>{
            setSearch(true)}}>
          </IonSearchbar>
       <div  onClick={()=>setSearch(false)}>
       {(search)?<div className="search-block" >
         {SearchedData?.map((d)=>(
           <>
             <IonItem onClick={()=>{
                 dispatch(getCurrentProduct(d?._id))
                 setSearch(false)
                 History.push("/page/ViewPage")}} style={{color:"black"}}
                 key={d?._id}>
                   <img src={d?.images[0]} style={{width:55}} />
                   {d.name}</IonItem>
                 </>
           ))}
           {(SearchedData.length===0)?"No Results Found":null}
           </div>:null}
           </div>
      </IonHeader>
           </>
    )
}