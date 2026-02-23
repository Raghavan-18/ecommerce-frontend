import axios from 'axios'
import { useEffect ,useState, Fragment} from 'react'
import { Header } from '../../components/Header.jsx'
import { OrdersGrids } from './OrdersGrids.jsx'
import './OrdersPage.css'
export function OrdersPage({cart}){
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
      const getOrders = async() => {
        const response =await axios.get('/api/orders?expand=products')
            setOrders(response.data);
        };
      getOrders();
    }, []);
    return (
        <>
    <Header cart={cart} />
    <div className="orders-page">
      <div className="page-title">Your Orders</div>
      <OrdersGrids orders={orders} />
    </div>
        </>
    );
}
