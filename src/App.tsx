import { FetchIndoorProduct,FetchOutdoorProduct,FetchPlantersProduct,FetchSoilFertilzerProduct, FetchSeasonalProduct,FetchSucculentProduct } from './Actions';
import { IonApp, IonRouterOutlet, IonSplitPane ,useIonAlert} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
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

const App: React.FC = () => {
  const dispatch=useDispatch()
  const [present] = useIonAlert();
  // SplashScreen.show({
  //   showDuration: 2000,
  //   autoHide: true
  // });
  useEffect(()=>{
    // present({
    //   cssClass: 'my-css',
    //   header: 'THEPETALGLOW',
    //   message: 'WELCOME TO ThePetalGlow,Use Coupon HAPPYPLANT30 TO GET 30% OFF UPTO 100RS.',
    //   buttons: [
    //     { text: 'Ok', handler: (d) => console.log('ok pressed') },
    //   ],
    //   onDidDismiss: (e) => console.log('did dismiss'),
    // })
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
              <Page/>
            </Route>
            <Route path="/page/ThePetalGlow/PrivacyPolicy" exact={true}>
              <Page/>
            </Route>
            <Route path="/page/ThePetalGlow/TermsandCondition" exact={true}>
              <Page/>
            </Route>
            <Route path="/page/ThePetalGlow/ShippingPolicy" exact={true}>
              <Page/>
            </Route>
            <Route path="/page/ThePetalGlow/AboutUs" exact={true}>
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
            <Route path="/page/MyWishList" exact={true}>
              <Page />
            </Route>
            <Route path="/page/MapsPage" exact={true}>
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
            <Route path="/page/EarthenPots" exact={true}>
              <Page />
            </Route>
            <Route path="/page/CeramicPots" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Pebbles" exact={true}>
              <Page />
            </Route>
            <Route path="/page/SoilandFertilizers" exact={true}>
              <Page />
            </Route>
            <Route path="/page/SucculentPlants" exact={true}>
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
            <Route path="/TrackOrder/:TrackId" >
              <Page />
            </Route>
            <Route path="/BuyAgainOrder/:OrderId" >
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
