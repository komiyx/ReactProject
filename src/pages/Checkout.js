import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom';
import QuantityBtn from './QuantityBtn';
import { CartContext } from './CartContext';

export default function Checkout() {

    let {cartItems} = useContext(CartContext)
    let cartEmpty = cartItems.length <= 0 ? true : false
    let grandTotal = cartItems.reduce((total,product)=>{
        return total += product.price * product.quantity
    },0)

    const freeShippingfee = 99; 

  return (
    <div className=''>
        <Title maintitle="Check Out"/>

        {
            cartEmpty &&
            <div>
                Your shopping cart is empty. <br/>
                <Link to='/'>back to home</Link>
            </div>
        }


        {
            !cartEmpty &&

            <div>
                <div>
                    {cartItems.map(product =>
                        <div key={product.id}>
                            <img src={process.env.PUBLIC_URL+ '/img/' + product.image}/>
                            {product.name}
                            {product.price}
                            <QuantityBtn productInfo={product}/>
                        </div>
                    )}
                </div>
                <div>
                    <div>All Total</div>
                    <div>{grandTotal}</div>

                    {
                        grandTotal >= freeShippingfee ? 
                        <div>Free Shipping is avaliable</div> : 
                        <div>if full RM{freeShippingfee} will be free shipping <br/>
                        still left RM{freeShippingfee - grandTotal} </div>
                    }
                </div>
            </div>
        }
    </div>
  )
}
