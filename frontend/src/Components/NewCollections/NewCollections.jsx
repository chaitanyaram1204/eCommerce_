import './NewCollections.css'
import Item from '../Items/Item'
import new_collections from '../Assets/new_collections'
import { useState, useEffect } from 'react'

const NewCollections = () => {
    const [new_collection, setNewCollection] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/newcollection')
            .then(res => res.json())
            .then(data => setNewCollection(data))

    }, [])
    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((collection, i) => {
                    return <Item key={i}
                        id={collection.id}
                        name={collection.name}
                        image={collection.image}
                        new_price={collection.new_price}
                        old_price={collection.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections