import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Home from './Home';
import QuantityBtn from './QuantityBtn';
import Title from './Title';

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
                <div>
                    <Title maintitle={productdetail.name}/>
                    <img src={process.env.PUBLIC_URL + '/img/' + productdetail.image} />
                    <p>Name: {productdetail.name}</p>
                    <p>Price: {productdetail.price}</p>
                    <p>description: {productdetail.description}</p>

                    <QuantityBtn productInfo={productdetail}/>
                    <br/>
                    <Link to="/">Back to home</Link>
                </div>
            }
        </div>
    )
}
