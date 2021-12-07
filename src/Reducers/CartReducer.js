const { v4: uuidv4 } = require('uuid');
const initialState = {
  items: [],
  customdescription:[],
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
          action.payload.orderquantity += 1
          return {
            ...state,
            items: [...state.items],
            total: state.total + action.payload.price,
            grandtotal: state.total + action.payload.price
          }
        }
        else {
          action.payload.orderquantity = 1;
          action.payload.customskuvalue=false
          const addon=[{
            whitepebbles:{
              isAdded:false,
              price:29,
              quantity:0
             }},{
            blackpebbles:{
             isAdded:false,
             price:29,
             quantity:0
             }},{
            BlackWhitepebbles:{
             isAdded: false,
             price:29,
             quantity:0
            }},{
            colouredpebbles:{
             isAdded: false,
             price:29,
             quantity:0
            }}
          ]
          let newTotal = state.total + action.payload.price
          const item=action.payload
          const newitem={...item,addon}
          return {
            ...state,
            items: [...state.items,newitem],
            total: newTotal,
            grandtotal:newTotal
          }}
       case 'REMOVE_FROM_CART':
        let new_items = state.items.filter(item => action.payload !== item._id)
        return {
          ...state,
          items: new_items,
        }
        case 'SET_QUANTITY':
          let incrementingItem = state.items.find(item => action.payload === item._id);

          incrementingItem.orderquantity += 1;
          return {
            ...state,
            items: [...state.items],
            total: state.total + incrementingItem.price*1,
            grandtotal: state.total + incrementingItem.price*1
          }
        case 'UNSET_QUANTITY':
          let decrementingItem = state.items.find(item => action.payload === item._id);
          if (decrementingItem.orderquantity > 1) {
            decrementingItem.orderquantity -= 1;
            return {
              ...state,
              items: [...state.items],
              total: state.total - decrementingItem.price*1,
              grandtotal: state.total - decrementingItem.price*1
            }
          } else {
            let deletingItem = state.items.filter(item => action.payload !== item._id)
            let finddeletingitem = state.items.find(item => action.payload === item._id)
             finddeletingitem?.addon?.forEach((data)=>{
                if(data?.whitepebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total
                     state.grandtotal=state.total
                }
                if(data?.blackpebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total
                     state.grandtotal=state.total
                }
                if(data?.BlackWhitepebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total
                     state.grandtotal=state.total
                }
                if(data?.colouredpebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total
                     state.grandtotal=state.total
                }
            })
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
              customdescription:[],
              loading: false,
              error: true,
              total: 0,
              grandtotal:0
            }
            case 'SET_GRAND_TOTAL':
              return {
                ...state,grandtotal:action.payload
              }
            case 'Add_Discount':
              return {
                ...state,grandtotal:state.grandtotal-action.payload
              }
            case 'remove_Discount':
              return {
                ...state,grandtotal:state.total
              }
            case 'SET_CUSTOM_SKU':
              let Item = state.items.find(item => action.payload.id === item._id);
                Item.customskuvalue=action.payload.value
                return {
                  ...state,items:[...state.items]
              }

               case "SET_WHITE_PEBBLE":
                  let setItem = state.items.find(item => action.payload.id === item._id);
                   setItem.addon[0].whitepebbles={
                    quantity:setItem.addon[0].whitepebbles.quantity=1,
                     price:29,
                    isAdded:action.payload.value}
                    if(action.payload.value){
                      setItem.price=setItem.price+29
                      state.total+=(29*setItem.orderquantity)
                    }else{
                      console.log(setItem.orderquantity)
                      setItem.price=setItem.price-29
                      state.total-=(29*setItem.orderquantity)
                    }
                    return {
                      ...state,items:[...state.items]
                    }
               case "SET_BLACK_PEBBLE":
                  let setItem1 = state.items.find(item => action.payload.id === item._id);
                  setItem1.addon[1].blackpebbles={
                    quantity:setItem1.addon[1].blackpebbles.quantity=1,
                     price:29,
                     isAdded:action.payload.value
                    }
                     if(action.payload.value){
                       setItem1.price=setItem1.price+29
                       state.total+=(29*setItem1.orderquantity)
                     }else{
                       console.log(setItem1.orderquantity)
                       setItem1.price=setItem1.price-29
                       state.total-=(29*setItem1.orderquantity)
                     }
                    return {
                      ...state,items:[...state.items]
                    }
               case "SET_BLACK_WHITE_PEBBLE":
                  let setItem2 = state.items.find(item => action.payload.id === item._id);
                  setItem2.addon[2].BlackWhitepebbles={
                    quantity:setItem2.addon[2].BlackWhitepebbles.quantity=1,
                     price:29,
                     isAdded:action.payload.value
                    }
                    if(action.payload.value){
                      setItem2.price=setItem2.price+29
                      state.total+=(29*setItem2.orderquantity)
                    }else{
                      console.log(setItem2.orderquantity)
                      setItem2.price=setItem2.price-29
                      state.total-=(29*setItem2.orderquantity)
                    }
                    return {
                      ...state,items:[...state.items]
                    }
               case "SET_COLOURED_PEBBLE":
                  let setItem3 = state.items.find(item => action.payload.id === item._id);
                  setItem3.addon[3].colouredpebbles={
                    quantity:setItem3.addon[3].colouredpebbles.quantity=1,
                     price:29,
                     isAdded:action.payload.value
                    }
                     if(action.payload.value){
                       setItem3.price=setItem3.price+29
                       state.total+=(29*setItem3.orderquantity)
                     }else{
                       setItem3.price=setItem3.price-29
                       state.total-=(29*setItem3.orderquantity)
                     }
                    return {
                      ...state,items:[...state.items]
                    }
                  case 'REMOVE_ITEM_FROM_ADDON':
                    let new_items1 = state.items.filter(item => action.payload.id !== item._id)
                    return {
                      ...state,
                      items: new_items1
                    }
                    case 'ADD_TO_CUSTOMZATION':
                      const id=uuidv4();
                      return {
                        ...state,
                        customdescription:[...state?.customdescription,{id:id,description:action.payload,isedit:false}]
                      }
                    case 'EDIT_CUSTOM_DESCRIPTION':
                       state.customdescription.forEach((data,i)=>{
                            if(action.payload===i){
                             data.isedit=true
                            }
                        })
                      return {
                        ...state
                      }
                    case 'REMOVE_CUSTOM_DESCRIPTION':
                      const custom1=state.customdescription.filter(item=>action.payload!=item.id )
                      return {
                        ...state,
                        customdescription:custom1
                      }
                    case 'SET_CUSTOM_EDIT_FALSE':
                      state.customdescription.forEach((data)=>{
                        if(action.payload===data.id){
                         data.isedit=false
                        }
                    })
                      return {
                        ...state
                      }
                      case 'EDIT_CUSTOMIZATION':
                        state.customdescription.forEach((data)=>{
                          if(action.payload.id===data.id){
                               data.isedit=false
                               data.description=action.payload.value
                           }
                      })
                      return {
                        ...state
                      }
        default:
            return{
              ...state
            }
    }
  };

  export {CartReducer};
