const initalState={
   Order:[],
   ActiveOrder:[],
   NotActiveOrder:[],
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
          case "SET_ACTIVE_ORDERS":
            return { ...state, ActiveOrder:state.Order.filter((or)=>or.Active!=false)};
          case "SET_NOT_ACTIVE_ORDERS":
            return { ...state,NotActiveOrder:state.Order.filter((or)=>or.Active===false) };
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