export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    // tính tổng giá sp trong gh
    state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  
    // tính phí ship
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  
    // thuế
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  
    // tổng tiền
    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
  
    // lưu vào local storage 
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };