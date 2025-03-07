import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'; 
function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity;
      }, 0).toFixed(2);
  };

  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // If cart is empty, display a message
  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty</h2>
        <button
          className="get-started-button1 continue_shopping_btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="total_cart_amount">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.map((item) => (
        <div key={item.name} className="cart-item">
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-image"
          />

          <div className="cart-item-details">
            <div>
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
            </div>

            <div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateItemSubtotal(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button
          className="get-started-button1 continue_shopping_btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;