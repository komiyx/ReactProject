import {Link} from "react-router-dom"
import {useState, useEffect} from "react"  //React Hook
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"

export default function Home() {

    let [productList, setProductList] = useState([])
    let [input , setInput] = useState('')

    //useEffect
    useEffect(()=>{
        fetch('https://komiyx.github.io/demoapi/react-product.json')
            .then(response => response.json())
            .then(data => setProductList(data))
    },[]) 


    return (
        <div>
            <Title maintitle="Please select your item" />
            
            <div className="container">
                {
                    productList.map(product=>(
                        <div key={product.id} className="productSection">
                            <Link to={'/product/'+product.id}>
                                <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name} />
                            </Link>
                            <br/>
                            {product.name}<br/>
                            <div className="productprice">
                                RM {product.price} / per kg
                            </div>
                            <QuantityBtn productInfo={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}