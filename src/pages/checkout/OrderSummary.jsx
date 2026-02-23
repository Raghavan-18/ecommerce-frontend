import dayjs from "dayjs";
import {formateMoney} from '../../utils/money.js'
import './CheckoutPage.css';
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions.jsx";
export function OrderSummary({cart, deliveryOptions , loadCart}) {
return (
    <div className="order-summary">
              {
                deliveryOptions.length > 0 && cart.map((cartItem)=>{ 
                  const selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  });

                  const deleteCartItem = async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await loadCart();
                  }
                  const updateCartItemQuantity = async ()=>{
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                      quantity : cartItem.quantity + 1
                    });
                    await loadCart();
                  }
                  const removeCartItemQuantity = async ()=>{
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                      quantity : cartItem.quantity - 1
                    });
                    await loadCart();
                  }
                  return (  
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartItem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {formateMoney(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary"
                        onClick = {updateCartItemQuantity}>
                          Update
                        </span>
                    
                        <span className="delete-quantity-link link-primary"
                        onClick = {removeCartItemQuantity}
                        >
                          Delete
                        </span>

                        <span className="update-quantity-link link-primary"
                        onClick = {deleteCartItem}>
                          Remove
                        </span>
                      </div>
                    </div>
                    <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart = {loadCart} />
                  </div>
                </div>
                  );
                })
              }
          </div>
);
}