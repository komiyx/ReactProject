import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Home from './Home';
import QuantityBtn from './QuantityBtn';
import Title from './Title';
import './productdetail.css';

export default function ProductDetails() {

    let params = useParams();
    let [productdetail, setproductdetail] = useState(null)

    useEffect(()=>{
        fetch('https://komiyx.github.io/demoapi/react-product.json')
            .then(response => response.json())
            .then(data => {
                let productInfo = data.find((element) =>
                {
                    return element.id === parseInt(params.id)
                })
                setproductdetail(productInfo)
            })
    },[]) 


    return (
        <div>   
            {
                productdetail &&
                <div className='productdetail'>
                    <Title maintitle={productdetail.name}/>

                    <table width="100%">
                        <tbody>
                            <tr>
                                <td align="right">
                                    <img src={process.env.PUBLIC_URL + '/img/' + productdetail.image} />
                                </td>
                                <td width="45%" padding="10">
                                    <p>Name: {productdetail.name}</p>
                                    <p>Price: {productdetail.price}</p>
                                    <p>Description: {productdetail.description}</p> <br/>
                                    <QuantityBtn productInfo={productdetail} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            <div className="backToGoodsListBtn">
                <Link to="/">Back to home</Link>
            </div>
        </div>
    )
}
