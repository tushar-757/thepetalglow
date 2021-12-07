
export const Addtocart=(item)=>{
    return {
        type:"ADD_TO_CART",
        payload:item
    }
}
export const Removefromcart=(id)=>{
    return {
        type:"REMOVE_FROM_CART",
        payload:id,
    }
}
export const setQuantity=(id)=>{
    return {
        type:"SET_QUANTITY",
        payload:id
    }
}
export const unsetQuantity=(id)=>{
    return {
        type:"UNSET_QUANTITY",
        payload:id,
    }
}
export const EmptyCart=()=>{
    return{
        type:"EMPTY_CART"
    }
}
export const GrandTotal=(total)=>{
    return{
        type:"SET_GRAND_TOTAL",
        payload:total,
    }
}
export const AddDiscount=(total)=>{
    return{
        type:"Add_Discount",
        payload:total,
    }
}
export const removeDiscount=(total)=>{
    return{
        type:"remove_Discount",
        payload:total,
    }
}
export const SetCustomSku=(id,value)=>{
    return {
      type: "SET_CUSTOM_SKU",
      payload:{id,value}
    };
  }
  export const setWhitePebbles=(id,value)=>{
    return {
      type:"SET_WHITE_PEBBLE",
      payload:{id,value}
    }
  }
  export const setBlackPebbles=(id,value)=>{
    return {
      type:"SET_BLACK_PEBBLE",
      payload:{id,value}
    }
  }
  export const setBlackWhitePebbles=(id,value)=>{
    return {
      type:"SET_BLACK_WHITE_PEBBLE",
      payload:{id,value}
    }
  }
  export const setColouredPebble=(id,value)=>{
    return {
      type:"SET_COLOURED_PEBBLE",
      payload:{id,value}
    }
  }
  export const removeitemfromaddon=(id,type)=>{
    return {
      type: "REMOVE_ITEM_FROM_ADDON",
      payload:{id,type}
    };
  }
  export const addtoCustomization=(value)=>{
    return {
      type:"ADD_TO_CUSTOMZATION",
      payload:value
    }
  }
  export const EditCustomDescription=(value)=>{
    return {
      type:"EDIT_CUSTOM_DESCRIPTION",
      payload:value
    }
  }
  export const RemoveCustomDescription=(value)=>{
    return {
      type:"REMOVE_CUSTOM_DESCRIPTION",
      payload:value
    }
  }
  export const setEditToFalse=(value)=>{
    return {
      type:"SET_CUSTOM_EDIT_FALSE",
      payload:value
    }
  }
  export const EditCustomization=(value,id)=>{
    return {
      type:"EDIT_CUSTOMIZATION",
      payload:{value,id}
    }
  }