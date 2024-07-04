import './CSS/ShopCategory.css'
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import all_product from '../Components/Assets/Products';
import Item from '../Components/Items/Item';
const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>
                        Showing 1-12
                    </span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((product, i) => {
                    if (props.category === product.category) {
                        return <Item key={i}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            new_price={product.new_price}
                            old_price={product.old_price} />
                    }
                    else {
                        return null;
                    }
                })
                }
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory