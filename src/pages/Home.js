import {Link} from "react-router-dom"
import {useState, useEffect} from "react"  //React Hook
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"

export default function Home() {

    let [productList, setProductList] = useState([])
    let [input , setInput] = useState('')

    //useEffect
    useEffect(()=>{
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response => response.json())
            .then(data => setProductList(data))
            
        console.log(productList)
    },[]) 


    return (
        <div>
            <Title maintitle="Please select your item" />
            
            <div>
                {
                    productList.map(product=>(
                        <div key={product.id}>
                            {product.name}<br/>
                            {product.price}<br/>
                            <Link to={'/product/'+product.id}>
                            <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name} />
                            </Link>
                            <br/>
                            {product.description}<br/>
                            <QuantityBtn productInfo={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}