const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getSum = (arr) => arr.reduce((sum, object) => object.price + sum, 0);
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_TO_CART": {
      const currentGroupPizzas = !state.items[action.payload.id] ? [action.payload] : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentGroupPizzas,
          totalPrice: getSum(currentGroupPizzas),
        },
      };

      const flattenNewPizzas = Array.prototype.concat.apply(
        [],
        Object.values(newItems).map((obj) => obj.items)
      );
      const totalPrice = getSum(flattenNewPizzas);

      return {
        ...state,
        items: newItems,
        totalCount: flattenNewPizzas.length,
        totalPrice,
      };
    }
    case "CLEAR_CART": {
      return initialState;
    }
    case "REMOVE_CART_ITEM":
      const newItems = JSON.parse(JSON.stringify(state.items));

      const removingItemTotalPrice = newItems[action.payload].totalPrice;
      const removingItemTotalCount = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - removingItemTotalPrice,
        totalCount: state.totalCount - removingItemTotalCount,
      };

    default:
      return state;
  }
};

export default cartReducer;
