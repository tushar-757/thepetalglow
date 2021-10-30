import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { Share } from '@capacitor/share';
import { useLocation } from 'react-router-dom';
import {  bookmark, cube, home, list, notificationsOutline, people, settings } from 'ionicons/icons';
import './Menu.css';
import {RootStateOrAny, useDispatch,useSelector} from 'react-redux';
import IsLoggedIn from '../Hooks/isLoggedIn';
import {useHistory} from 'react-router-dom'
import { EmptyCart, EmptyOrders, RemoveUser, UserOrders } from '../Actions';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/ThePetalGlow',
    iosIcon: home,
    mdIcon: home
  },
  {
    title: 'your orders',
    url: '/page/Orders',
    iosIcon: cube,
    mdIcon: cube
  },
  {
    title: 'buy again',
    url: '/page/BuyAgain',
    iosIcon: bookmark,
    mdIcon: bookmark
  },
  {
    title: 'my wish list',
    url: '/page/MyWishList',
    iosIcon: list,
    mdIcon: list
  },
  {
    title: 'Notifications',
    url: '/page/Notifications',
    iosIcon: notificationsOutline,
    mdIcon: notificationsOutline
  },
  {
    title: 'Settings',
    url: '/page/Settings',
    iosIcon: settings,
    mdIcon: settings
  },
  {
    title: 'customer Service',
    url: '/page/Customer Service',
    iosIcon: people,
    mdIcon: people
  },

];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const User=useSelector((state:RootStateOrAny)=>state.UserReducer.User)
  const [user, user_id] = IsLoggedIn();
  const History=useHistory()
  const dispatch=useDispatch()

  const LoginHandler=()=>{
      History.push("/page/Login")
  }
  const LogoutHandler=()=>{
    if (user !== null && user_id !== null){
      console.log("dsdsds")
      dispatch(EmptyCart())
      dispatch(EmptyOrders())
      dispatch(RemoveUser())
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      localStorage.removeItem('useraccesstoken');
      localStorage.removeItem('orderID');
    }
  }
  const ShareHandler=async()=>{
    await Share.share({
      title: 'PlantGiene Mobile App',
      text: 'Really awesome app',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
  return (
    <IonMenu contentId="main" type="overlay" style={{width:'300px'}}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{color:"#686868"}}>{(User.username!="")?User?.username:"Unknown"}</IonListHeader>
          <IonNote>{(User.username!="")?User?.email:"Unknown@gmail.com"}</IonNote>
          <div className="menuLoginbtn">
            {
              (User.username!="")?
              <IonButton onClick={()=>LogoutHandler()} style={{color:"white"}}>logout</IonButton>:
              <IonButton onClick={()=>LoginHandler()} style={{color:"white"}}>login</IonButton>
            }
            <IonButton onClick={()=>History.push('/page/TrackOrder')} style={{color:"white"}}>Tack Order</IonButton>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url}
                routerDirection="none" lines="none"
                 detail={false}
                 onClick={(appPage.url==="/page/Orders")?()=>dispatch(UserOrders()):undefined}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel style={{color:"#686868"}}>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonFooter>
          <IonButton onClick={()=>ShareHandler()} style={{color:"white"}}>Share</IonButton>
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
