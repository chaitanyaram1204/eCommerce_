import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.jpeg'
import pinterest_icon from '../Assets/pinterest_icon.webp'
import whatsapp_icon from '../Assets/whatsapp_icon.webp'
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-icons-container">
                <div className="footer-social-icon">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-social-icon">
                    <img src={pinterest_icon} alt="" />
                </div>
                <div className="footer-social-icon">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer