import axios from "axios";
const dev="http://localhost:5000"
// const aws="https://api.thepetalglow.com"
const awsserverless="https://actzkesq20.execute-api.ap-south-1.amazonaws.com/dev/"
 const aws=awsserverless
export const GetItem = (id) => {
    return {
      type: "GET_ITEM",
      payload:id
    };
  };
export const CurrentLocation=()=>{
    return {
        type:"GET_LOCATION"
    }
}
export const BestSellingItems=()=>{
    return {
        type:"BEST_SELLING_ITEMS"
    }
}
export const SeasonalPlants=(id)=>{
    return {
        type:"GET_SEASONAL_ITEM",
        payload:id
    }
}
export const plasticPots=(id)=>{
    return {
        type:"GET_POT",
        payload:id
    }
}

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
export const AddtoNotification=(item)=>{
    return {
        type:"ADD_NOTIFICATION",
        payload:item
    }
}
export const RemovefromNotification=(id)=>{
    return {
        type:"REMOVE_NOTIFICATION",
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
export const applycoupon=(number)=>{
    return{
        type:"APPLY_COUPON",
        payload:number
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
export const addUser=(registeruser)=>{
    return{
        type:"ADD_USER",
        payload:registeruser
    }
}
export const RemoveUser=()=>{
    return{
        type:"REMOVE_USER"
    }
}
export const EmptyOrders=()=>{
    return{
        type:"EMPTY_ORDER"
    }
}
export const setLatLng=(lat,lng)=>{
    return {
        type:"SET_LAT_LNG",
        payload:{lat,lng}
    }
}
const getOrdersRequest = () => {
    return {
      type: "GET_ORDERS_REQUEST",
    };
  };

  const getOrdersSuccess = (Orders) => {
    return {
      type: "GET_ORDERS_SUCCESS",
      payload: Orders,
    };
  };

  const getOrdersFailure = (error) => {
    return {
      type: "GET_ORDERS_FAILURE",
      payload: error,
    };
  };
const url = `${aws}/GetOrders`;
export const UserOrders=()=>{
    const useraccesstoken=localStorage.getItem('useraccesstoken')
    return (dispatch) => {
        dispatch(getOrdersRequest());
        // const orders=await axios.get('https://plantapp57.herokuapp.com/GetOrders',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
        // console.log(orders.data.UserOrders.orders)nm
         axios.get(url,
            {headers:{Authorization:`Bearer ${useraccesstoken}`}})
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
              const Orders = data.UserOrders.orders;
              dispatch(getOrdersSuccess(Orders));
              dispatch(SET_ACTIVE_ORDERS())
              dispatch(SET_NOT_ACTIVE_ORDERS())
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(getOrdersFailure(errorMessage));
            });
      };
}



export const UserSelectedOrder=(id)=>{
return {
    type:"GET_USER_ORDER",
    payload:id
}
}
const getProductRequest = () => {
  return {
    type: "GET_PRODUCT_REQUEST",
  };
};

const getProductSuccess = (Product) => {
  return {
    type: "GET_PRODUCT_SUCCESS",
    payload: Product,
  };
};

const getProductFailure = (error) => {
  return {
    type: "GET_PRODUCT_FAILURE",
    payload: error,
  };
};
export const getProduct = (id) => {
  return {
    type: "GET_USER_PRODUCT",
    payload: id,
  };
};

const url1 = `${aws}/PlantGieneIndoorProducts`;
export const FetchProduct=()=>{
  return (dispatch) => {
      dispatch(getProductRequest());
      // const Product=await axios.get('https://plantapp57.herokuapp.com/GetProduct',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
      // console.log(Product.data.UserProduct.Product)nm
       axios.get(url2)
          .then((response) => response.data)
          .then((data) => {
              console.log(data)
            const Product = data;
            dispatch(getProductSuccess(Product));
          })
          .catch((error) => {
            const errorMessage = error.message;
            dispatch(getProductFailure(errorMessage));
          });
    };
}



const getIndoorProductRequest = () => {
    return {
      type: "GET_INDOOR_PRODUCT_REQUEST",
    };
  };

  const getIndoorProductSuccess = (Product) => {
    return {
      type: "GET_INDOOR_PRODUCT_SUCCESS",
      payload: Product,
    };
  };

  const getIndoorProductFailure = (error) => {
    return {
      type: "GET_INDOOR_PRODUCT_FAILURE",
      payload: error,
    };
  };
  export const getIndoorProduct = (id) => {
    return {
      type: "GET_INDOOR_USER_PRODUCT",
      payload: id,
    };
  };

const url2 = `${aws}/PlantGiene/IndoorProducts`;
export const FetchIndoorProduct=()=>{
    return (dispatch) => {
        dispatch(getIndoorProductRequest());
        // const Product=await axios.get('https://plantapp57.herokuapp.com/GetProduct',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
        // console.log(Product.data.UserProduct.Product)nm
         axios.get(url2)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
              const Product = data;
              dispatch(getIndoorProductSuccess(Product));
              dispatch(SETBESTSELLING())
              dispatch(GetALLProducts())
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(getIndoorProductFailure(errorMessage));
            });
      };
}
const getOutdoorProductRequest = () => {
    return {
      type: "GET_OUTDOOR_PRODUCR_REQUEST",
    };
  };

  const getOutdoorProductSuccess = (Product) => {
    return {
      type: "GET_OUTDOOR_PRODUCT_SUCCESS",
      payload: Product,
    };
  };

  const getOutdoorProductFailure = (error) => {
    return {
      type: "GET_OUTDOOR_PRODUCT_FAILURE",
      payload: error,
    };
  };
  export const getOutdoorProduct = (id) => {
    return {
      type: "GET_OUTDOOR_USER_PRODUCT",
      payload: id,
    };
  };

const url3 = `${aws}/PlantGiene/OutdoorProducts`;
export const FetchOutdoorProduct=()=>{
    return (dispatch) => {
        dispatch(getOutdoorProductRequest());
        // const Product=await axios.get('https://plantapp57.herokuapp.com/GetProduct',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
        // console.log(Product.data.UserProduct.Product)nm
         axios.get(url3)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
              const Product = data;
              dispatch(getOutdoorProductSuccess(Product));
              dispatch(SETBESTSELLING())
              dispatch(GetALLProducts())
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(getOutdoorProductFailure(errorMessage));
            });
      };
}
const getSeasonalProductRequest = () => {
    return {
      type: "GET_SEASONAL_PRODUCR_REQUEST",
    };
  };

  const getSeasonalProductSuccess = (Product) => {
    return {
      type: "GET_SEASONAL_PRODUCT_SUCCESS",
      payload: Product,
    };
  };

  const getSeasonalProductFailure = (error) => {
    return {
      type: "GET_SEASONAL_PRODUCT_FAILURE",
      payload: error,
    };
  };
  export const getSeasonalProduct = (id) => {
    return {
      type: "GET_SEASONAL_USER_PRODUCT",
      payload: id,
    };
  };

const url4 = `${aws}/PlantGiene/IndoorProducts`;
export const FetchSeasonalProduct=()=>{
    return (dispatch) => {
        dispatch(getSeasonalProductRequest());
        // const Product=await axios.get('https://plantapp57.herokuapp.com/GetProduct',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
        // console.log(Product.data.UserProduct.Product)nm
         axios.get(url2)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
              const Product = data;
              dispatch(getSeasonalProductSuccess(Product));
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(getSeasonalProductFailure(errorMessage));
            });
      };
}
const getPlantersProductRequest = () => {
    return {
      type: "GET_PLANTERS_PRODUCT_REQUEST",
    };
  };

  const getPlantersProductSuccess = (Product) => {
    return {
      type: "GET_PLANTERS_PRODUCT_SUCCESS",
      payload: Product,
    };
  };

  const getPlantersProductFailure = (error) => {
    return {
      type: "GET_PLANTERS_PRODUCT_FAILURE",
      payload: error,
    };
  };


const url5 = `${aws}/PlantGiene/PlanterProducts`;
export const FetchPlantersProduct=()=>{
    return (dispatch) => {
        dispatch(getPlantersProductRequest());
        // const Product=await axios.get('https://plantapp57.herokuapp.com/GetProduct',{headers:{Authorization:`Bearer ${useraccesstoken}`}})
        // console.log(Product.data.UserProduct.Product)nm
         axios.get(url5)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
              const Product = data;
              dispatch(getPlantersProductSuccess(Product));
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(getPlantersProductFailure(errorMessage));
            });
      };
}

export const GetSelectedIndoor = (id) => {
  return {
    type: "GET_SELECTED_INDOOR",
    payload:id
  };
};
export const GetSelectedOutdoor = (id) => {
  return {
    type: "GET_SELECTED_OUTOOR",
    payload:id
  };
};
export const GetSelectedSeasonal = (id) => {
  return {
    type: "GET_SELECTED_SEASONAL",
    payload:id
  };
};
export const GetSelectedPlanter = (id) => {
  return {
    type: "GET_SELECTED_PLANTER",
    payload:id
  };
};
export const GetSelectedPebble = (id) => {
  return {
    type: "GET_SELECTED_PEBBLE",
    payload:id
  };
};
export const GetALLProducts = () => {
  return {
    type: "GET_ALL_PRODUCTS_DATA"
  };
};

export const setFilterData=(item)=>{
  return {
    type: "SET_FILTER_DATA",
    payload:item
  };
}
export const getCurrentProduct=(id)=>{
  return {
    type: "GET_SELECTED_PRODUCT",
    payload:id
  };
}
export const SETBESTSELLING=()=>{
  return {
    type: "SET_BEST_SELLING_DATA"
  };
}
export const GETSELECTEDBESTSELLING=(id)=>{
  return {
    type: "GET_SELECTED_BESTSELLING",
    payload:id
  };
}
export const SET_ACTIVE_ORDERS=()=>{
  return {
    type: "SET_ACTIVE_ORDERS"
  };
}
export const SET_NOT_ACTIVE_ORDERS=()=>{
  return {
    type: "SET_NOT_ACTIVE_ORDERS"
  };
}
export const addToLikes=(id)=>{
  const add='https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/thepetalglow-nwqbb/service/ThePetalGlow/incoming_webhook/SetProductLike'
  axios.put(add,{id:id})
  .then((response) => response.data)
  .catch((error) => {
    const errorMessage = error.message;
  });
  return {
    type: "ADD_TO_LIKES",
    payload:id
  };
}
export const removefromLikes=(id)=>{
  const remove='https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/thepetalglow-nwqbb/service/ThePetalGlow/incoming_webhook/removeItemLike?secret=-=76*%23$xxctumy76(8)'
  axios.put(remove,{id:id})
  .then((response) => response.data)
  .catch((error) => {
    const errorMessage = error.message;
  });
  return {
    type: "REMOVE_FROM_LIKES",
    payload:id
  };
}
export const SetCustomSku=(id,value)=>{
  return {
    type: "SET_CUSTOM_SKU",
    payload:{id,value}
  };
}
export const addAddonItemsToCartItem=(id,type)=>{
  return {
    type: "ADD_ADDON_ITEMS_TO_CART",
    payload:{id,type}
  };
}
export const removeAddonItemsToCartItem=(id,type)=>{
  return {
    type: "REMOVE_ADDON_ITEMS_TO_CART",
    payload:{id,type}
  };
}
export const removeitemfromaddon=(id,type)=>{
  return {
    type: "REMOVE_ITEM_FROM_ADDON",
    payload:{id,type}
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
export const addtoCustomization=(value)=>{
  return {
    type:"ADD_TO_CUSTOMZATION",
    payload:value
  }
}
export const setReview=(value)=>{
  return {
    type:"SET_REVIEW",
    payload:value
  }
}

export const setMenuIndex=(value)=>{
  return {
    type:"SET_MENU_INDEX",
    payload:value
  }
}
////customization actions
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
export const setLoading=()=>{
return {
  type:"SET_LOADING"
}
}
export const setUnLoading=()=>{
return {
  type:"SET_UN_LOADING"
}
}
// export const AddtoIndoor=(item)=>{
//   return {
//       type:"ADD_INDOOR",
//       payload:item
//   }
// }
// export const AddtoOutdoor=(item)=>{
//   return {
//       type:"ADD_OUTDOOR",
//       payload:item
//   }
// }
// export const AddtoSeasonal=(item)=>{
//   return {
//       type:"ADD_SEASONAL",
//       payload:item
//   }
// }

// export const GetSelectedIndoor = (id) => {
//   return {
//     type: "GET_SELECTED_INDOOR",
//     payload:id
//   };
// };
// export const GetSelectedOutdoor = (id) => {
//   return {
//     type: "GET_SELECTED_OUTOOR",
//     payload:id
//   };
// };
// export const GetSelectedSeasonal = (id) => {
//   return {
//     type: "GET_SELECTED_SEASONAL",
//     payload:id
//   };
// };