export const cartReducer = (state, action) => {
  switch (action.type) {
    case "add_to_cart":
      return {...state,cart:[...state.cart,{...action.payload,qty:1}]};
    case "remove_from_cart":
      return {...state,cart:state.cart.filter(c=>c.id!==action.payload.id),};
    default:
      return state;
  }
}