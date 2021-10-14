const initalState={
   Order:[],
   loading: false,
   error: null,
   selectedorder:{}
}
const OrderReducer = (state = initalState, action) => {
    switch (action.type) {
        case "GET_ORDERS_REQUEST":
          return { ...state, loading: true };
        case "GET_ORDERS_SUCCESS":
          return { ...state,loading: false, Order: action.payload };
        case "GET_ORDERS_FAILURE":
          return {...state, loading: false, error: action.payload };
        case "GET_USER_ORDER":
          const finduserorder=state.Order.find(item => action.payload === item.id)
          if(finduserorder===undefined){
            return{...state,selectedorder:{id:'not exist',description:'not exist'}}
          }
          return {...state,selectedorder:finduserorder};
          case "EMPTY_ORDER":
              return {
                Order:[],
                loading: false,
                error: null,
                selectedorder:{}
             }
        default:
          return state
      }
}
export {OrderReducer};