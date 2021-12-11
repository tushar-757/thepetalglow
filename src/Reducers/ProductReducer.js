const initalState={
    Products:[],
    Indoor:[],
    Outdoor:[],
    Seasonal:[],
    Planters:[],
    Pebbles:[],
    Succulent:[],
    Fertilizers:[],
    FilterData:[],
    BestSellingData:[],
    review:[],
     fivestar:0,
     fourstar:0,
     threestar:0,
     twostar:0,
     onestar:0,
    loading: false,
    error: null,
    selectedProduct:{}
 }

 const ProductReducer = (state = initalState, action) => {
     switch (action.type) {
       case "GET_ALL_PRODUCTS_DATA":
         return{
           ...state,Products:[...state.Indoor,...state.Outdoor,...state.Planters,...state.Pebbles,...state.Fertilizers]
         };
      case "GET_SUCCULENT_PRODUCT_REQUEST":
        return { ...state, loading: true };
      case "GET_SUCCULENT_PRODUCT_SUCCESS":
        const data3=action.payload;
        const succulentdata=data3.map((d)=>(
          {...d,isLiked:false}
        ))
        return { ...state,loading: false, Succulent: succulentdata};
      case "GET_SUCCULENT_PRODUCT_FAILURE":
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
          const data=action.payload
          const data0=data.map((d)=>(
            {...d,isLiked:false}
          ))
           return { ...state,loading: false, Indoor: data0 };
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
          const data1=action.payload
          const data2=data1.map((d)=>(
            {...d,isLiked:false}
          ))
           return { ...state,loading: false, Outdoor: data2 };
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
          const data4=action.payload;
          const seasonaldata=data4.map((d)=>(
            {...d,isLiked:false}
          ))
           return { ...state,loading: false, Seasonal: seasonaldata };
         case "GET_SEASONAL_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_PLANTERS_PRODUCT_REQUEST":
           return { ...state, loading: true };
         case "GET_PLANTERS_PRODUCT_SUCCESS":
           const pebbles=action.payload.filter((data)=>data.type==="Pebble");
           const planters=action.payload.filter((data)=>data.type==="Plastic");
           const data5=pebbles;
            const pebblesdata=data5.map((d)=>(
              {...d,isLiked:false}
             ))
           const data6=planters;
            const plantersdata=data6.map((d)=>(
              {...d,isLiked:false}
             ))
           return {
             ...state,
             loading: false,
             Planters:plantersdata,
             Pebbles:pebblesdata
           }
         case "GET_PLANTERS_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_SOIL_FERTILIZER_PRODUCT_REQUEST":
           return { ...state, loading: true };
         case "GET_SOIL_FERTILIZER_PRODUCT_SUCCESS":
           return { ...state,loading: false, Fertilizers:action.payload};
         case "GET_SOIL_FERTILIZER_PRODUCT_FAILURE":
           return {...state, loading: false, error: action.payload };
         case "GET_PLANTERS_USER_PRODUCT":
           const findPlanterProduct=state.Planters.find(item => action.payload === item._id)
           if(findPlanterProduct===undefined){
             return{...state,selectedProduct:{id:'not exist',description:'not exist'}}
           }
           return {...state,selectedProduct:findPlanterProduct};
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
            case "GET_SELECTED_PLANTER":
              const finduserPlanters=state.Planters.find(item => action.payload === item._id)
              if(finduserPlanters===undefined){
                return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
              }
              return {...state,selectedProduct:finduserPlanters};
            case "GET_SELECTED_PEBBLE":
              const findpebble=state.Pebbles.find(item => action.payload === item._id)
              if(findpebble===undefined){
                return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
              }
              return {...state,selectedProduct:findpebble};
            case "GET_SELECTED_SUCCULENT":
              const findsucculent=state.Succulent.find(item => action.payload === item._id)
              if(findsucculent===undefined){
                return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
              }
              return {...state,selectedProduct:findsucculent};
            case "GET_SELECTED_FERTILIZER":
              const findsoil=state.Fertilizers.find(item => action.payload === item._id)
              if(findsoil===undefined){
                return{...state,selectedProduct:{_id:'not exist',description:'not exist'}}
              }
              return {...state,selectedProduct:findsoil};
          case "SET_FILTER_DATA":
              return{
                ...state,FilterData:action.payload
              }
          case "SET_BEST_SELLING_DATA":
              return{
                ...state,BestSellingData:[...state.Indoor.filter((data)=>data?.BestSelling===true),
                ...state.Outdoor.filter((data)=>data?.BestSelling===true)]
              }
              case "ADD_TO_LIKES":
                let item=state.BestSellingData.find(item => action.payload === item._id)
                if(item===null||item===undefined){
                  item=state.Indoor.find(item => action.payload === item._id)
                  if(item===null||item===undefined){
                    item=state.Outdoor.find(item => action.payload === item._id)
                    if(item===null||item===undefined){
                      item=state.Seasonal.find(item => action.payload === item._id)
                      if(item===null||item===undefined){
                        item=state.Planters.find(item => action.payload === item._id)
                        if(item===null||item===undefined){
                          item=state.Fertilizers.find(item => action.payload === item._id)
                          if(item===null||item===undefined){
                            item=state.Pebbles.find(item => action.payload === item._id)
                            if(item===null||item===undefined){
                              item=state.Succulent.find(item => action.payload === item._id)
                            }
                          }
                        }
                      }
                    }
                  }
                }
                item.isLiked=!item.isLiked
                item.likes++
                return {
                  ...state,
                  BestSellingData:[...state.BestSellingData],
                  Indoor:[...state.Indoor],
                  Outdoor:[...state.Outdoor],
                  Planters:[...state.Planters],
                  Fertilizers:[...state.Fertilizers],
                  Pebbles:[...state.Pebbles],
                  Seasonal:[...state.Seasonal],
                  Succulent:[...state.Succulent]
                }
              case "REMOVE_FROM_LIKES":
                let item1=state.BestSellingData.find(item => action.payload === item._id)
                if(item1===null||item1===undefined){
                  item1=state.Indoor.find(item => action.payload === item._id)
                 if(item1===null||item1===undefined){
                   item1=state.Outdoor.find(item => action.payload === item._id)
                   if(item1===null||item1===undefined){
                     item1=state.Seasonal.find(item => action.payload === item._id)
                     if(item1===null||item1===undefined){
                       item1=state.Planters.find(item => action.payload === item._id)
                       if(item===null||item===undefined){
                        item=state.Fertilizers.find(item => action.payload === item._id)
                        if(item===null||item===undefined){
                          item=state.Pebbles.find(item => action.payload === item._id)
                          if(item===null||item===undefined){
                            item=state.Succulent.find(item => action.payload === item._id)
                          }
                        }
                      }
                     }
                   }
                 }
               }
                item1.isLiked=!item1.isLiked
                item1.likes--
                return {
                  ...state,
                  BestSellingData:[...state.BestSellingData],
                  Indoor:[...state.Indoor],
                  Outdoor:[...state.Outdoor],
                  Planters:[...state.Planters],
                  Fertilizers:[...state.Fertilizers],
                  Pebbles:[...state.Pebbles],
                  Succulent:[...state.Succulent]
                }
                case "SET_REVIEW":
                  const reviews=action?.payload
                  if(reviews!=undefined){
                    state.fivestar=0
                    state.fourstar=0
                    state.threestar=0
                    state.twostar=0
                    state.onestar=0
                    reviews.map((data)=>{
                      if(data?.stars===5){
                         state.fivestar=state.fivestar+1
                      }
                      if(data?.stars===4||data?.stars===4.5){
                        state.fourstar=state.fourstar+1
                      }
                      if(data?.stars===3||data?.stars===3.5){
                        state.threestar=state.threestar+1
                       }
                      if(data?.stars===2||data?.stars===2.5){
                        state.twostar=state.twostar+1
                      }
                       if(data?.stars===1||data?.stars===1.5){
                        state.onestar=state.onestar+1
                       }
                     })
                  }
                  return {
                    ...state,review:action.payload
                  }
         default:
           return state
       }
 }
 export {ProductReducer};