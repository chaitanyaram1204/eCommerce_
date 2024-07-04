import './Hero.css'
import hero_image from '../Assets/hero image.png'
import hand_icon from '../Assets/hand icon.png'
import arrow_icon from '../Assets/arrow icon.png'
const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hand-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt="hand_icon" height="100px" />
                    </div>
                    <p>Collections</p>
                    <p>For everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="arrow icon" height="20px" width="40px" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="hero image" height="1000px" />
            </div>
        </div>
    )
}

export default Hero