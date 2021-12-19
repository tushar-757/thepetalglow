import { FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSoilFertilzerProduct, FetchSeasonalProduct,FetchSucculentProduct } from './Actions';
import { IonApp, IonRouterOutlet, IonSplitPane ,useIonAlert} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import PasswordReset from './pages/PasswordReset';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import 'animate.css';
import "./App.css"
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsandCondition from './components/TermsAndConditions';
import ShippingPolicy from './components/ShippingPolicy';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SearchBar from './pages/SearchBar';
import ViewPage from './pages/ViewPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PaymentGategay from './pages/PaymentGateway';
import Orders from './pages/Orders';
import BuyAgain from './pages/BuyAgain';
import Notifications from './pages/Notifications';
import WishList from './pages/WishList';
import MapsPage from './pages/MapsPage';
import IndoorPage from './pages/IndoorPage';
import OutdoorPage from './pages/OutdoorPage';
import SeasonalPage from './pages/SeasonalPage';
import PlantersPage from './pages/PlasticPots';
import CeramicPots from './pages/CeramicPots';
import EarthenPots from './pages/EarthenPots';
import Pebbles from './pages/Pebbles';
import SoilandFertilizers from './pages/SoilandFertilizers';
import Succulent from './pages/Succulent';
import Register from './pages/Register';
import CustomerService from './pages/CustomerService';
import Setting from './pages/Setting';
import TrackOrder from './pages/TrackOrder';
import Home from './pages/Home';
import BuyAgainViewPage from './pages/BuyAgainViewPage';

const App: React.FC = () => {
  const dispatch=useDispatch()
  const [present] = useIonAlert();


  useEffect(()=>{
    present({
      cssClass: 'my-css',
      header: 'THEPETALGLOW',
      message: 'WELCOME TO ThePetalGlow,if you want a complete company/office setup with discount`s please email us at services@thepetalglow.com we will get back to you in 24 hours',
      buttons: [
        { text: 'Ok', handler: (d) => console.log('ok pressed') },
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
    dispatch(FetchSeasonalProduct())
    dispatch(FetchIndoorProduct())
    dispatch(FetchOutdoorProduct())
    dispatch(FetchPlantersProduct())
    dispatch(FetchSucculentProduct())
    dispatch(FetchSoilFertilzerProduct())
  },[])

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/ThePetalGlow" exact={true}>
              <Home/>
            </Route>
            <Route path="/page/ThePetalGlow/PrivacyPolicy" exact={true}>
              <PrivacyPolicy/>
            </Route>
            <Route path="/page/ThePetalGlow/TermsandCondition" exact={true}>
              <TermsandCondition/>
            </Route>
            <Route path="/page/ThePetalGlow/ShippingPolicy" exact={true}>
              <ShippingPolicy/>
            </Route>
            <Route path="/page/ThePetalGlow/AboutUs" exact={true}>
              <AboutUs/>
            </Route>
            <Route path="/page/ThePetalGlow/ContactUs" exact={true}>
              <ContactUs/>
            </Route>
            <Route path="/page/searchbar" exact={true}>
              <SearchBar />
            </Route>
            <Route path="/page/ViewPage" exact={true}>
              <ViewPage />
            </Route>
            <Route path="/page/Cart" exact={true}>
              <Cart />
            </Route>
            <Route path="/page/Login" exact={true}>
              <Login />
            </Route>
            <Route path="/page/PaymentGateway" exact={true}>
              <PaymentGategay />
            </Route>
            <Route path="/page/Orders" exact={true}>
              <Orders />
            </Route>
            <Route path="/page/BuyAgain" exact={true}>
              <BuyAgain />
            </Route>
            <Route path="/page/TrackOrder" exact={true}>
              <TrackOrder />
            </Route>
            <Route path="/page/Notifications" exact={true}>
              <Notifications />
            </Route>
            <Route path="/page/MyWishList" exact={true}>
              <WishList />
            </Route>
            <Route path="/page/MapsPage" exact={true}>
              <MapsPage />
            </Route>
            <Route path="/page/IndoorPlants" exact={true}>
              <IndoorPage />
            </Route>
            <Route path="/page/OutdoorPlants" exact={true}>
              <OutdoorPage />
            </Route>
            <Route path="/page/SeasonalPlants" exact={true}>
              <SeasonalPage />
            </Route>
            <Route path="/page/PlasticPots" exact={true}>
              <PlantersPage />
            </Route>
            <Route path="/page/EarthenPots" exact={true}>
              <EarthenPots />
            </Route>
            <Route path="/page/CeramicPots" exact={true}>
              <CeramicPots />
            </Route>
            <Route path="/page/Pebbles" exact={true}>
              <Pebbles />
            </Route>
            <Route path="/page/SoilandFertilizers" exact={true}>
              <SoilandFertilizers />
            </Route>
            <Route path="/page/SucculentPlants" exact={true}>
              <Succulent />
            </Route>
            <Route path="/Register" exact={true}>
              <Register />
            </Route>
            <Route path="/page/Settings" exact={true}>
              <Setting />
            </Route>
            <Route path="/page/Customer Service" exact={true}>
              <CustomerService />
            </Route>
            <Route path="/TrackOrder/:TrackId" >
              <TrackOrder />
            </Route>
            <Route path="/BuyAgainOrder/:OrderId" >
              <BuyAgainViewPage />
            </Route>
            <Route path="/password-reset/:userId/:token" exact={true}>
              <PasswordReset />
            </Route>
            <Route path="/"exact={true} >
              <Redirect to="/page/ThePetalGlow" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
