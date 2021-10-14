const initialState = {
  items: [],
  loading: false,
  error: true,
  total: 0,
  grandtotal:0
};
const CartReducer = (state = initialState, action) => {
    switch (action.type) {
       case "ADD_TO_CART":
        let existed_item = state.items.find(item => action.payload._id === item._id)
        if (existed_item) {
          action.payload.quantity += 1
          return {
            ...state,
            items: [...state.items],
            total: state.total + action.payload.price,
            grandtotal: state.total + action.payload.price
          }
        }
        else {
          action.payload.quantity = 1;
          let newTotal = state.total + action.payload.price

          return {
            ...state,
            items: [...state.items, action.payload],
            total: newTotal,
            grandtotal:newTotal
          }}
       case 'REMOVE_FROM_CART':
        let new_items = state.items.filter(item => action.payload !== item._id)
        return {
          ...state,
          items: new_items
        }
        case 'SET_QUANTITY':
          let incrementingItem = state.items.find(item => action.payload === item._id);

          incrementingItem.quantity += 1;
          return {
            ...state,
            items: [...state.items],
            total: state.total + incrementingItem.price*1,
            grandtotal: state.total + incrementingItem.price*1
          }
        case 'UNSET_QUANTITY':
          let decrementingItem = state.items.find(item => action.payload === item._id);
          if (decrementingItem.quantity > 1) {
            decrementingItem.quantity -= 1;
            return {
              ...state,
              items: [...state.items],
              total: state.total - decrementingItem.price*1,
              grandtotal: state.total - decrementingItem.price*1
            }
          } else {
            let deletingItem = state.items.filter(item => action.payload !== item._id)
            return {
              ...state,
              items: deletingItem,
              total: state.total - decrementingItem.price*1,
              grandtotal: state.total - decrementingItem.price*1
            }
          }
          case 'EMPTY_CART':
            return {
              items: [],
              loading: false,
              error: true,
              total: 0,
              grandtotal:0
            }
            case 'SET_GRAND_TOTAL':
              return {
                ...state,grandtotal:action.payload
              }
        default:
            return{
              ...state
            }
    }
  };
  // const quantityById = (state = initalState.ProductId, action) => {
  //   const { payload,prize } = action
  //   switch (action.type) {
  //     case 'SET_QUANTITY':
  //       return { ...state,
  //         [payload]: (state[payload] || 0) + 1,price
  //       }
  //       case 'UNSET_QUANTITY':
  //         return { ...state,
  //           [payload]: (state[payload] || 0) - 1,
  //           price
  //         }
  //      case 'REMOVE_FROM_CART':
  //        console.log(payload)
  //        delete state[payload]
  //        return state;
  //     default:
  //       return state
  //   }
  // }


// export const getQuantity = (state, productId) =>
// state.ProductId[productId] || 0



  export {CartReducer};
