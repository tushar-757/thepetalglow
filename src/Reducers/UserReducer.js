const initalState={
    User:{
      id:'',
        username:'',
        email:'',
        mobile:'',
        Address:{}
      },
      lat:28.4089,
      lng:77.3178
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
        default:
            return{
              ...state
            }
}
}
export {UserReducer};