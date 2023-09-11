import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom';
import QuantityBtn from './QuantityBtn';
import { CartContext } from './CartContext';
import '../pages/checkout.css';

export default function Checkout() {

    let {cartItems} = useContext(CartContext)
    let cartEmpty = cartItems.length <= 0 ? true : false
    let grandTotal = cartItems.reduce((total,product)=>{
        return total += product.price * product.quantity
    },0)

    const freeShippingfee = 150; 
    const shippingfee = 15;

    let total = grandTotal >= freeShippingfee ? grandTotal : grandTotal + shippingfee;

    let handlecheckout =()=>
    {
        alert('You are done the checkout ✔️, total is: ' + total );
        window.location.reload();
    }

  return (
    <div className=''>
        <Title maintitle="Check Out"/>

        {
            cartEmpty &&
            <div className='cartEmpty'>
                Your shopping cart is empty. <br/>
                <div className='backtohome'>
                    <Link to='/'>back to home</Link>
                </div>
            </div>
        }

        {
            !cartEmpty &&

            <div className='container'>
                <div className='cartSection'>
                    <table className="checkoutTable">
                        <tbody>
                            {
                                cartItems.map(product=>(
                                    <tr key={product.id}>
                                        <td>
                                            <Link to={'/product/'+product.id}>
                                            <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name}/>
                                            </Link>
                                        </td>
                                        <td>
                                            <p className='name'>Name : {product.name}</p>
                                            <p className='price'>Price : RM{product.price}</p>
                                            <p className='desc'>{product.description}</p>
                                        </td>
                                        <td width="200">
                                            <QuantityBtn productInfo={product} />
                                        </td>
                                        <td>
                                            <div className="productSubTotal">
                                                RM{product.price*product.quantity}
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="ordersummary">
                    <p className='ordertitle'>Order Summary</p>
                    <p className="Subtotal">Subtotal: <span>RM{grandTotal}</span></p>
                    {
                        grandTotal >= freeShippingfee ? 
                        <p className="shippingfee">Shipping Fee: <span>RM0</span></p> 
                        :
                        <p className="shippingfee">Shipping Fee: <span>RM{shippingfee}</span></p>
                    }
                    {
                        grandTotal >= freeShippingfee ? 
                        <p className="freeShipping">✔️Free Delivery</p> 
                        :
                        <p className="noShipping">If spend more than <span>RM{freeShippingfee-grandTotal}</span> to get the<span> free shipping.</span><br/></p>
                    }
                    {
                        grandTotal >= freeShippingfee ?
                        <p className="total">Total: <span>RM{grandTotal}</span></p> 
                        :
                        <p className="total">Total: <span>RM{grandTotal + shippingfee}</span></p> 
                    }
                    
                    <button onClick={handlecheckout}>Proceed to checkout</button>
                </div>
            </div>
        }
    </div>
  )
}
