const initalState={
    User:{
      id:'',
        username:'',
        email:'',
        mobile:'',
        Address:{}
      },
      lat:0,
      lng:0,
      WishListItems:[]
}
const UserReducer = (state = initalState, action) => {
    switch (action.type) {
        case "ADD_USER":
         const {username,email,mobile,Address}=action.payload;
            return {
                ...state,
                User: {username,email,mobile,Address}
              }

         case 'REMOVE_USER':
        return {
          User:{
            id:'',
              username:'',
              email:'',
              mobile:'',
              Address:{},
          }
        }
        case 'SET_LAT_LNG':{
           return {...state,
          lat:action.payload.lat,
          lng:action.payload.lng
          }
        }
        case "ADD_TO_WISHLIST":
          const finditem=state.WishListItems.find(item=>action.payload._id===item._id)
          if(finditem){
            return {
              ...state
            }
          }
          const items=[...state.WishListItems,action.payload]
          localStorage.setItem("wishlistitems",JSON.stringify(items))
          return {
            ...state,
            WishListItems:items
          }
          case "SET_ADDRESS":
            const {hno,society,pincode}=action.payload;
            state.User.Address={hno,society,pincode}
            return {
              ...state
            }
        default:
            return{
              ...state
            }
}
}
export {UserReducer};