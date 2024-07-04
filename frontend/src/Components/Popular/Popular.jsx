import './Popular.css'
import Item from '../Items/Item'
import { useState, useEffect } from 'react'
const Popular = () => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/popularwomen')
            .then(res => res.json())
            .then(data => {
                setPopular(data)
            })
    }
        , [])
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popular.map((product, i) => {
                    return <Item key={i}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        new_price={product.new_price}
                        old_price={product.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular