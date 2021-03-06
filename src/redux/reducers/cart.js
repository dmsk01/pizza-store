const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_TO_CART": {
      const currentPizzaItems = !state.items[action.payload.id] ? [action.payload] : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "REMOVE_CART_ITEM": {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return { totalPrice: 0, totalCount: 0, items: {} };

    default:
      return state;
  }
};

export default cart;
// const initialState = {
//   items: {},
//   totalPrice: 0,
//   totalCount: 0,
// };

// const getSum = (arr) => arr.reduce((sum, object) => object.price + sum, 0);

// const _get = (obj, path) => {
//   const [firstKey, ...keys] = path.split(".");
//   return keys.reduce((val, key) => {
//     return val[key];
//   }, obj[firstKey]);
// };

// const getTotalSum = (obj, path) => {
//   return Object.values(obj).reduce((sum, obj) => {
//     const value = _get(obj, path);
//     return sum + value;
//   }, 0);
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_PIZZA_TO_CART": {
//       const currentGroupPizzas = !state.items[action.payload.id] ? [action.payload] : [...state.items[action.payload.id].items, action.payload];
//       const newItems = {
//         ...state.items,
//         [action.payload.id]: {
//           items: currentGroupPizzas,
//           totalPrice: getSum(currentGroupPizzas),
//         },
//       };

//       const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
//       const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);

//       return {
//         ...state,
//         items: newItems,
//         totalCount,
//         totalPrice,
//       };
//     }
//     case "CLEAR_CART": {
//       return initialState;
//     }
//     case "REMOVE_CART_ITEM":
//       const newItems = JSON.parse(JSON.stringify(state.items));

//       const removingItemTotalPrice = newItems[action.payload].totalPrice;
//       const removingItemTotalCount = newItems[action.payload].items.length;

//       delete newItems[action.payload];

//       return {
//         ...state,
//         items: newItems,
//         totalPrice: state.totalPrice - removingItemTotalPrice,
//         totalCount: state.totalCount - removingItemTotalCount,
//       };

//     case "PLUS_CART_ITEM": {
//       const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
//       console.log(newItems);
//       return {
//         ...state,
//         items: {
//           ...state.items,
//           [action.payload]: {
//             items: newItems,
//           },
//         },
//         totalPrice: getSum(newItems),
//       };
//     }

//     case "MINUS_CART_ITEM": {
//       const oldItems = state.items[action.payload].items;
//       const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
//       const newItems = {
//         ...state.items,
//         [action.payload]: {
//           items: newObjItems,
//           totalPrice: getSum(newObjItems),
//         },
//       };

//       const totalCount = getTotalSum(newItems, "items.length");
//       const totalPrice = getTotalSum(newItems, "totalPrice");

//       return {
//         ...state,
//         items: newItems,
//         totalCount,
//         totalPrice,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default cartReducer;
