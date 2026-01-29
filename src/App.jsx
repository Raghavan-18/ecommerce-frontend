import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useEffect ,useState} from 'react'
import  { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import './App.css'

function App() {
  const [cart, setcart]=useState ([]);
      useEffect(()=>{
          axios.get('/api/cart-items?expand=product')
          .then((response)=>{
              setcart(response.data);
          });
      }, [])
  return (
    <Routes>
      <Route index element = {<HomePage cart = {cart}/>}/>
      <Route path ="checkout" element = {<CheckoutPage cart ={cart}/>} />
      <Route path ="orders" element = {<OrdersPage/>} />
      <Route path ="tracking" element = {<TrackingPage/>}/>
    </Routes>
  )
}
export default App
