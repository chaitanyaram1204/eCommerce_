import './Men.css'
import men_image from '../Assets/temp.png'
import hand_icon from '../Assets/hand icon.png'
import arrow_icon from '../Assets/arrow icon.png'
const Men = () => {
    return (
        <div className='men'>
            <div className="men-left">
                <div>
                    <p>FLAT 50% OFF</p>
                    <p>12 Hours 20  Mins</p>
                </div>
                <div className="men-latest-btn">
                    <div>Explore now</div>
                    <img src={arrow_icon} alt="arrow icon" height="20px" width="40px" />
                </div>
            </div>
            <div className="men-right">
                <img src={men_image} alt="men image" height="600px" width="800px" />
            </div>
        </div>
    )
}

export default Men