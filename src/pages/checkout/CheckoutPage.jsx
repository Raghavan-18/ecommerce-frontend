import axios from 'axios';
import {useState, useEffect} from 'react';
import { CheckOutPageHeader } from './CheckOutPage-header.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';
import './CheckoutPage.css';
export function CheckoutPage({ cart }){
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(()=>{
      const getDeliveryOptions = async() => {
        const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
      }
      getDeliveryOptions();

      const getPaymentSummary = async() => {
        const response = await axios.get('/api/payment-summary');
        setPaymentSummary(response.data);
      } 
      getPaymentSummary();
      
  }, []);

    return(
    <>
      <CheckOutPageHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary = {paymentSummary}/>
        </div>
      </div>
    </>
    );
}