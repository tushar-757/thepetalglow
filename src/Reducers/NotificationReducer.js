const initialState = {
    Notifications: [],
    loading: false,
    error: true,
    user:{}
  };
 export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
       case "ADD_NOTIFICATION":
        // let existed_item = state.Notifications.find(item => action.payload.id === item.id)
        // if (existed_item) {
        //   return {
        //     ...state,
        //     Notifications: [...state.Notifications],
        //   }
        // else {
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
        default:
          return{
            ...state
          }    
    }
  };