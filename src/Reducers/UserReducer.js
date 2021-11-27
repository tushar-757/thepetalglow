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
         case 'ADD_LOCATION':
            const {id,hno,society,streetname,pincode}=action.payload;
            let existed_user1 = state.User.find(User => id === User.id)
        return {
          ...state,
          User:{Address:{
              hno,society,streetname,pincode
          }}
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
        default:
            return{
              ...state
            }
}
}
export {UserReducer};