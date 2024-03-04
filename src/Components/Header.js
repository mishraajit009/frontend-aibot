import { useState,useEffect } from "react"

function  Header  (){
    const [items,setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        console.log("Initial Render")
    }, []);
return (
    <div>
        <h2>Items</h2>
        
        <div>
            <h2>Orange</h2> 
            <span>Price :-</span> <span> 40 Rs</span>
            <br></br>
            <button onClick={setItems.push({name:"Orange",price:40})}> Add To Cart</button>
        </div>
        <div>
            <h2>Peach</h2> 
            <span>Price :-</span> <span> 100 Rs</span>
            <button onClick={setItems.push({name:"Peach",price:100})}> Add To Cart</button>
        </div>
        <div>
            <h2>WaterMelon</h2> 
            <span>Price :-</span> <span> 60 Rs</span>
            <button onClick={setItems.push({name:"WaterMelon",price:60})}> Add To Cart</button>
        </div>
        <div>
            <h2>XYZ</h2> 
            <span>Price :-</span> <span> 40 Rs</span>
            <button onClick={setItems.push({name:"XYZ",price:40})}> Add To Cart</button>
        </div>
    </div>

)
}

export default Header
