import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect( () =>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect( () => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step-1: get id
        for(const id in storedCart){
            // step-2: get the product by using id
            const addedProduct = products.find(product => product.id === id)

            // step-3: get quantity of the product
            if(addedProduct){
                const quantity = storedCart[id];
              addedProduct.quantity = quantity;
            //   step-4: add the added product to the saved cart
              saveCart.push(addedProduct)
            }
            //   console.log(addedProduct)
        }
        // step-5: set the cart
        setCart(saveCart);
    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remainig = cart.filter(pd => pd.id !== product.id);
            newCart = [...remainig, exists];
        }
        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () =>{
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                    key={product.id}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart = {cart} 
               handleClearCart ={handleClearCart}
               >
               <Link className='proced-link' to= '/orders'>
               <button className='btn-proceed'>Review Order
               <FontAwesomeIcon className='proceed-icon' icon={faArrowCircleRight} />
               </button>
               </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;