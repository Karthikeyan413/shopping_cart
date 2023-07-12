import { createContext, useContext, useReducer } from 'react'
import { faker } from "@faker-js/faker"
import { cartReducer } from './Reducers';

const Cart = createContext();
faker.seed(42);
const Context = ({ childern }) => {
    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        image: faker.image.urlLoremFlickr({ category: 'cats' }),
        inStock: faker.number.int({ min: 0, max: 15 }),
        fastDelivery: faker.datatype.boolean(),
        rating: faker.number.int({ min: 1, max: 5 }),
    }));
    console.log(products)

    const [state, dispatch] = useReducer(cartReducer, {products: products,cart:[]});
  return (
    <Cart.Provider value={{state , dispatch}}>
        {childern}
    </Cart.Provider>
  )
}

export default Context
export const Cartstate = () => {
  return useContext(Cart)
}