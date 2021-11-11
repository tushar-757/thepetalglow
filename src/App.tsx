import { IonApp, IonRouterOutlet, IonSplitPane ,useIonAlert} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import { useDispatch } from "react-redux";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSeasonalProduct, SETBESTSELLING } from './Actions';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
// import { SplashScreen } from '@capacitor/splash-screen';
/* Theme variables */
import './theme/variables.css';
import "./App.css"
import { useEffect } from 'react';
import PasswordReset from './pages/PasswordReset';

const App: React.FC = () => {
  const dispatch=useDispatch()
  const [present] = useIonAlert();
  // SplashScreen.show({
  //   showDuration: 2000,
  //   autoHide: true
  // });
  useEffect(()=>{
    console.log("helloo")
    present({
      cssClass: 'my-css',
      header: 'THEPETALGLOW',
      message: 'WELCOME TO ThePetalGlow,Use Coupon HAPPYPLANT30 TO GET 30% OFF UPTO 100RS.',
      buttons: [
        { text: 'Ok', handler: (d) => console.log('ok pressed') },
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
    // dispatch(FetchSeasonalProduct())
    dispatch(FetchIndoorProduct())
    dispatch(FetchOutdoorProduct())
    dispatch(FetchPlantersProduct())
  },[])
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/ThePetalGlow" exact={true}>
              <Page/>
            </Route>
            <Route path="/page/searchbar" exact={true}>
              <Page />
            </Route>
            <Route path="/page/ViewPage" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Cart" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Login" exact={true}>
              <Page />
            </Route>
            <Route path="/page/PaymentGateway" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Orders" exact={true}>
              <Page />
            </Route>
            <Route path="/page/BuyAgain" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Notifications" exact={true}>
              <Page />
            </Route>
            <Route path="/page/MapsPage" exact={true}>
              <Page />
            </Route>
            <Route path="/page/TrackOrder" exact={true}>
              <Page />
            </Route>
            <Route path="/page/TrackOrder/:OrderId" exact={true}>
              <Page />
            </Route>
            <Route path="/page/IndoorPlants" exact={true}>
              <Page />
            </Route>
            <Route path="/page/OutdoorPlants" exact={true}>
              <Page />
            </Route>
            <Route path="/page/SeasonalPlants" exact={true}>
              <Page />
            </Route>
            <Route path="/page/PlasticPots" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Pebbles" exact={true}>
              <Page />
            </Route>
            <Route path="/Register" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Customer Service" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Settings" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Account" exact={true}>
              <Page />
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
