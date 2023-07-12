import { Cartstate } from "../context/Context"
import SingleProduct from "./SingleProduct";
import './styles.css'
const Home = () => {

  const {state: {products}} = Cartstate();

  console.log(products);
  return (
    <div className="home">
      {/* <Filters/> */}
      <div className="productContainer">
        {
          products.map((prod) => {
            return <SingleProduct prod={prod} key={prod.id}/>
          })
        }
      </div>
    </div>
  )
}

export default Home