import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/orders';
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItem;
      if (currentQty > 1) {
        updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum
        );
        updatedCartItem = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItem = { ...state.items };
        delete updatedCartItem[action.pid];
      }
      return { 
          ...state,
          items: updatedCartItem,
          totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
      case ADD_ORDER:
        return initialState;

      case DELETE_PRODUCT:
        if (!state.items[action.pid]) {
          return state;
        }

        const updatedItems = { ...state.items };
        const itemTotal = state.items[action.pid].sum;
        delete updatedItems[action.pid];
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        };
  }
  return state;
};
