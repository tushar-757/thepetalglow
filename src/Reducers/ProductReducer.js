const initalState={
    Products:[],
    Indoor:[],
    Outdoor:[],
    Seasonal:[],
    FilterData:[],
    BestSellingData:[],
    loading: false,
    error: null,
    selectedProduct:{}
 }
 const ProductReducer = (state = initalState, action) => {
     switch (action.type) {
       case "GET_ALL_PRODUCTS_DATA":
         return{
           ...state,Products:[...state.Indoor,...state.Outdoor]
         };
      case "GET_PRODUCT_REQUEST":
        return { ...state, loading: true };
      case "GET_PRODUCT_SUCCESS":
        return { ...state,loading: false, Product: action.payload };
      case "GET_PRODUCT_FAILURE":
        return {...state, loading: false, error: action.payload };
      case "GET_USER_PRODUCT":
        const findProductProduct=state.Product.find(item => action.payload === item._id)
        if(findProductProduct===undefined){
          return{...state,selectedProduct:{id:'not exist',description:'not exist'}}
        }
        return {...state,selectedProduct:findProductProduct};
         case "GET_INDOOR_PRODUCT_REQUEST":
           return { ...state, loading: true };
         case "GET_INDOOR_PRODUCT_SUCCESS":
           return { ...state,loading: false, Indoor: action.payload };
         case "GET_INDOOR_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_INDOOR_USER_PRODUCT":
           const findindoorProduct=state.Indoor.find(item => action.payload === item._id)
           if(findindoorProduct===undefined){
             return{...state,selectedProduct:{id:'not exist',description:'not exist'}}
           }
           return {...state,selectedProduct:findindoorProduct};
         case "GET_OUTDOOR_PRODUCT_REQUEST":
           return { ...state, loading: true };
         case "GET_OUTDOOR_PRODUCT_SUCCESS":
           return { ...state,loading: false, Outdoor: action.payload };
         case "GET_OUTDOOR_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_OUTDOOR_USER_PRODUCT":
           const findoutdoorProduct=state.Outdoor.find(item => action.payload === item._id)
           if(findoutdoorProduct===undefined){
             return{...state,selectedProduct:{id:'not exist',description:'not exist'}}
           }
           return {...state,selectedProduct:findoutdoorProduct};
         case "GET_SEASONAL_PRODUCT_REQUEST":
           return { ...state, loading: true };
         case "GET_SEASONAL_PRODUCT_SUCCESS":
           return { ...state,loading: false, Seasonal: action.payload };
         case "GET_SEASONAL_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_SEASONAL_USER_PRODUCT":
           const findseasonalProduct=state.Seasonal.find(item => action.payload === item._id)
           if(findseasonalProduct===undefined){
             return{...state,selectedProduct:{id:'not exist',description:'not exist'}}
           }
           return {...state,selectedProduct:findseasonalProduct};
           case "GET_SELECTED_INDOOR":
            const finduserindoor=state.Indoor.find(item => action.payload === item._id)
            if(finduserindoor===undefined){
              return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
            }
            return {...state,selectedProduct:finduserindoor};
          case "GET_SELECTED_OUTOOR":
            const finduseroutdoor=state.Outdoor.find(item => action.payload === item._id)
            if(finduseroutdoor===undefined){
              return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
            }
            return {...state,selectedProduct:finduseroutdoor};
          case "GET_SELECTED_SEASONAL":
            const finduserseasonal=state.Seasonal.find(item => action.payload === item._id)
            if(finduserseasonal===undefined){
              return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
            }
            return {...state,selectedProduct:finduserseasonal};
          case "GET_SELECTED_PRODUCT":
            const finduserProducts=state.Products.find(item => action.payload === item._id)
            if(finduserProducts===undefined){
              return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
            }
            return {...state,selectedProduct:finduserProducts};
            case "GET_SELECTED_BESTSELLING":
              const finduserbestSelling=state.BestSellingData.find(item => action.payload === item._id)
              if(finduserbestSelling===undefined){
                return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
              }
              return {...state,selectedProduct:finduserbestSelling};
          case "SET_FILTER_DATA":
              return{
                ...state,FilterData:action.payload
              }
          case "SET_BEST_SELLING_DATA":
              return{
                ...state,BestSellingData:[...state.Indoor.filter((data)=>data?.BestSelling===true),
                ...state.Outdoor.filter((data)=>data?.BestSelling===true)]
              }
         default:
           return state
       }
 }
 export {ProductReducer};