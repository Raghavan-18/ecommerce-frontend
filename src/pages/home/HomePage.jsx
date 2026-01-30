import axios from 'axios'
import { useEffect ,useState} from 'react'
import { Header } from '../../components/Header.jsx'
import './HomePage.css'
import { ProductsGrid } from './ProductsGrid.jsx'
export function HomePage({cart}){
    const [products, setproducts] = useState([]);
    useEffect(()=>{
        const getHomeData = async() => {
        const response = await axios.get('/api/products');
        setproducts(response.data);
        }
      getHomeData();
    }, [])
    return(
        <>
           <Header cart={cart}/>
           <div className="home-page">
            <ProductsGrid products={products}/>
           </div>
        </>
    
        
    )
}