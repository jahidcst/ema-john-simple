import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {
    // const cart = props.cart;
    // const {cart} = props;

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity =0;
    for (const product of cart){
        
        totalPrice = totalPrice + product.price * product.quantity; 
        totalShipping = totalShipping + product.shipping;  
        quantity = quantity + product.quantity;
     }
     const tax = totalPrice*5/100;

     const grandTotal = totalPrice + totalShipping + tax;
     

    return (
        <div className='cart'>
            <h3>Order Summary</h3>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${totalPrice}</p>
                <p> Shipping: {totalShipping} </p>
                <p>Tax: {tax.toFixed(2)}</p>
                <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
                <button  onClick={ handleClearCart} className='clear-btn'>Clear Cart
                <FontAwesomeIcon className='clear-icon' icon={faTrashAlt} />
                </button>
                {children}
        </div>
    );
};

export default Cart;