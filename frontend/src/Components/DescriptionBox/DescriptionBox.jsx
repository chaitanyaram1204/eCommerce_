import './DescriptionBox.css'
const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-navbox">
                    Description
                </div>
                <div className="descriptionbox-navbox fade">
                    Reviews (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>Ecommerce (or electronic commerce) is the buying and selling of goods or services on the Internet. It encompasses a wide variety of data, systems and tools for online buyers and sellers, including mobile shopping and online payment encryption.</p>
                <p>
                    At its core, electronic commerce or e-commerce is simply the buying and selling of goods and services using the internet, when shopping online. However, the term is often used to describe all of a seller's efforts when selling products directly to consumers online.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox