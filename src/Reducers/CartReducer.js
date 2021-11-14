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
          action.payload.customizationarray=[]
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
          action.payload.customdescription=""
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
                     state.total=state.total-(data.whitepebbles.price*data.whitepebbles.quantity)
                     state.grandtotal=state.total-(data.whitepebbles.price*data.whitepebbles.quantity)
                }
                if(data?.blackpebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total-(data.blackpebbles.price*data.blackpebbles.quantity)
                     state.grandtotal=state.total-(data.blackpebbles.price*data.blackpebbles.quantity)
                }
                if(data?.BlackWhitepebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total-(data.BlackWhitepebbles.price*data.BlackWhitepebbles.quantity)
                     state.grandtotal=state.total-(data.BlackWhitepebbles.price*data.BlackWhitepebbles.quantity)
                }
                if(data?.colouredpebbles?.isAdded===true){
                     data.isAdded=false
                     data.quantity=0
                     state.total=state.total-(data.colouredpebbles.price*data.colouredpebbles.quantity)
                     state.grandtotal=state.total-(data.colouredpebbles.price*data.colouredpebbles.quantity)
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
              loading: false,
              error: true,
              total: 0,
              grandtotal:0
            }
            case 'SET_GRAND_TOTAL':
              return {
                ...state,grandtotal:action.payload
              }
            case 'SET_CUSTOM_SKU':
              let Item = state.items.find(item => action.payload.id === item._id);
                Item.customskuvalue=action.payload.value
                return {
                  ...state,items:[...state.items]
              }
              case "ADD_ADDON_ITEMS_TO_CART":
                let findItem = state.items.find(item => action.payload.id === item._id);
                const type=action.payload.type
                if(findItem){
                if(type==='whitepebble'){
                  (findItem.addon[0].whitepebbles={
                        quantity:findItem.addon[0].whitepebbles.quantity+=1,
                         price:29,
                        isAdded:true})
                 }
                  if(type==='blackpebbles'){
                    (findItem.addon[1].blackpebbles={
                      quantity:findItem.addon[1].blackpebbles.quantity+=1,
                       price:29,
                      isAdded:true})
                  }

                  if(type==='baclandwhitepebble'){
                   ( findItem.addon[2].BlackWhitepebbles={
                      quantity:findItem.addon[2].BlackWhitepebbles.quantity+=1,
                       price:29,
                      isAdded:true
                    })
                  }
                  if(type==='colouredpebbles'){
                   ( findItem.addon[3].colouredpebbles={
                      quantity:findItem.addon[3].colouredpebbles.quantity+=1,
                       price:29,
                      isAdded:true})
                  }

                  return {
                    ...state, items: [...state.items], total: state.total + 29
                  }
              }
              return {
                ...state, items: [...state.items]
              }
              case "REMOVE_ADDON_ITEMS_TO_CART":
                let findItem1 = state.items.find(item => action.payload.id === item._id);
                const type1=action.payload.type
                if(findItem1){
                if(type1==='whitepebble'){
                  if(findItem1.addon[0].whitepebbles.quantity===1){
                    (findItem1.addon[0].whitepebbles={
                      quantity:findItem1.addon[0].whitepebbles.quantity=0,
                       price:29,
                      isAdded:false})
                  }else{
                    (findItem1.addon[0].whitepebbles={
                        quantity:findItem1.addon[0].whitepebbles.quantity-=1,
                         price:29,
                        isAdded:true})}
                 }
                  if(type1==='blackpebbles'){
                    if(findItem1.addon[1].blackpebbles.quantity===1){
                      (findItem1.addon[1].blackpebbles={
                        quantity:findItem1.addon[1].blackpebbles.quantity=0,
                         price:29,
                        isAdded:false})
                    }else{
                    (findItem1.addon[1].blackpebbles={
                      quantity:findItem1.addon[1].blackpebbles.quantity-=1,
                       price:29,
                      isAdded:true})}
                  }

                  if(type1==='baclandwhitepebble'){
                    if(findItem1.addon[2].BlackWhitepebbles.quantity===1){
                      (findItem1.addon[2].BlackWhitepebbles={
                        quantity:findItem1.addon[2].BlackWhitepebbles.quantity=0,
                         price:29,
                        isAdded:false})
                    }else{
                     (findItem1.addon[2].BlackWhitepebbles={
                      quantity:findItem1.addon[2].BlackWhitepebbles.quantity-=1,
                       price:29,
                      isAdded:true
                    })}
                  }
                  if(type1==='colouredpebbles'){
                    if(findItem1.addon[3].colouredpebbles.quantity===1){
                      (findItem1.addon[3].colouredpebbles={
                        quantity:findItem1.addon[3].colouredpebbles.quantity=0,
                         price:29,
                        isAdded:false})
                    }else{
                   (findItem1.addon[3].colouredpebbles={
                      quantity:findItem1.addon[3].colouredpebbles.quantity-=1,
                       price:29,
                      isAdded:true})}
                  }

                  return {
                    ...state, items: [...state.items], total: state.total - 29
                  }
              }
              return {
                ...state, items: [...state.items]
              }
               case "SET_WHITE_PEBBLE":
                  let setItem = state.items.find(item => action.payload.id === item._id);
                   setItem.addon[0].whitepebbles={
                    quantity:setItem.addon[0].whitepebbles.quantity=1,
                     price:29,
                    isAdded:true}
                    return {
                      ...state,items:[...state.items],
                      total: state.total + 29
                    }
               case "SET_BLACK_PEBBLE":
                  let setItem1 = state.items.find(item => action.payload.id === item._id);
                  setItem1.addon[1].blackpebbles={
                    quantity:setItem1.addon[1].blackpebbles.quantity=1,
                     price:29,
                    isAdded:true}
                    return {
                      ...state,items:[...state.items],
                      total: state.total + 29
                    }
               case "SET_BLACK_WHITE_PEBBLE":
                  let setItem2 = state.items.find(item => action.payload.id === item._id);
                  setItem2.addon[2].BlackWhitepebbles={
                    quantity:setItem2.addon[2].BlackWhitepebbles.quantity=1,
                     price:29,
                    isAdded:true}
                    return {
                      ...state,items:[...state.items],
                      total: state.total + 29
                    }
               case "SET_COLOURED_PEBBLE":
                  let setItem3 = state.items.find(item => action.payload.id === item._id);
                  setItem3.addon[3].colouredpebbles={
                    quantity:setItem3.addon[3].colouredpebbles.quantity=1,
                     price:29,
                    isAdded:true}
                    return {
                      ...state,items:[...state.items],
                      total: state.total + 29
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
                        customdescription:[...state.customdescription,{id:id,description:action.payload,isedit:false}]
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
    // }else{
                //   if(type==='whitepebble'){
                //     (findItem.addon.whitepebbles={
                //           quantity:findItem.addon.whitepebbles.quantity=1,
                //            price:29,
                //           isAdded:true}
                //     )
                //    }
                //     if(type==='blackpebbles'){
                //       (findItem.addon.blackpebbles={
                //         quantity:findItem.addon.blackpebbles.quantity=1,
                //          price:29,
                //         isAdded:true}
                //     )}

                //     if(type==='baclandwhitepebble'){
                //     (
                //       findItem.addon.BlackWhitepebbles={
                //         quantity:findItem.addon.BlackWhitepebbles.quantity=1,
                //          price:29,
                //         isAdded:true
                //       }
                //     )
                //     if(type==='colouredpebbles'){
                //     (
                //       findItem.addon.colouredpebbles={
                //         quantity:findItem.addon.colouredpebbles.quantity=1,
                //          price:29,
                //         isAdded:true}
                //     )}
                //   return {
                //     ...state, items: [...state.items]
                //   }
                // }


  export {CartReducer};
