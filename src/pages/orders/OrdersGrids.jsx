import dayjs from "dayjs";
import {formateMoney} from '../../utils/money.js'
import { OrdersDetailsGrid } from "./OrdersDetailsGrid.jsx";
export function OrdersGrids({orders}){
return (
    <div className="orders-grid">
      {orders.map((order)=>{
        return (
          <div key = {order.id} className="order-container">
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formateMoney(order.totalCostCents)}</div>
              </div> 
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <OrdersDetailsGrid order={order}/>
        </div>
        
        );
        
      })}
      </div>
);

}