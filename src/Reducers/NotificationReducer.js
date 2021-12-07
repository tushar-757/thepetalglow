const initialState = {
    Notifications: [],
    menuindex:false,
    loading: false,
    error: true,
    user:{},
    Loading:false
  };
 export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
       case "ADD_NOTIFICATION":
          return {
            ...state,
            Notifications: [...state.Notifications, action.payload],
          }
       case 'REMOVE_NOTIFICATION':
        let new_Notifications = state.Notifications.filter(item => action.payload !== item.id)
        return {
          ...state,
          Notifications: new_Notifications
        }
        case 'SET_MENU_INDEX':
          return {
            ...state,
            menuindex:action.payload
          }
          case 'SET_LOADING':
            return {
              ...state,
              Loading:true
            }
          case 'SET_UN_LOADING':
            return {
              ...state,
              Loading:false
            }
        default:
          return{
            ...state
          }
    }
  };

//   const returnFunction=()=>{
//     if(locationstate==='/page/ThePetalGlow'){
//      return <Home/>
//     }
//           if(locationstate==='/page/MapsPage'){
//             return(<MapsPage/>)
//           }
//           if(locationstate==='/page/ViewPage'){
//             (<ViewPage/>)
//           }
//   if(locationstate==='/page/Cart'){
//     (<Cart/>)
//   }
//   if(locationstate==='/page/Login'){
//     (<Login/>)
//   }
//   if(locationstate==='/Register'){
//     (<Register/>)
//   }
//   if(locationstate==='/page/PaymentGateway'){
//     (<PaymentGategay/>)
//   }
//   if(locationstate==='/page/Orders'){
//     (<Orders/>)
//   }
//   if(locationstate==='/page/BuyAgain'){
//     (<BuyAgain/>)
//   }
//   if(locationstate===`/BuyAgainOrder/${OrderIds}`){
//     (<BuyAgainViewPage/>)
//   }
//   if(locationstate==='/page/Notifications'){
//     (<Notifications/>)
//   }
//   if(locationstate==='/page/IndoorPlants'){
//     (<IndoorPage/>)
//   }
//   if(locationstate==='/page/OutdoorPlants'){
//     (<OutdoorPage/>)
//   }
//   if(locationstate==='/page/SeasonalPlants'){
//     (<SeasonalPage/>)
//   }
//   if(locationstate==='/page/PlasticPots'){
//     (<PlasticPots/>)
//   }
//   if(locationstate==='/page/Pebbles'){
//     (<Pebbles/>)
//   }
//   if(locationstate==='/page/Customer Service'){
//     (<CustomerService/>)
//   }
//   if(locationstate==='/page/Settings'){
//     (<Setting/>)
//   }
//   if(locationstate==='/page/searchbar'){
//     (<SearchBar/>)
//   }
//   if(locationstate==='/page/BuyAgainOrder'){
//     (<BuyAgainViewPage/>)
//   }
//   if(locationstate==="/page/MyWishList"){
//     (<WishList/>)
//   }
//   if(locationstate===`/TrackOrder/${TrackIds}`){
//     (<TrackOrder/>)
//   }
// }