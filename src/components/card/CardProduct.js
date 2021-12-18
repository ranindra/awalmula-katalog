import "./CardProduct.scss";

function CardProduct(props) {
    return (
        <div id={props.id} className="card-product">
            <img className="img-prod" src={props.img_src} alt="product-img"/>
            <span className="brand-prod">{props.brand}</span>
            <h5 className="name-prod">{props.name}</h5>
            <div className="price-prod">Rp {props.price}</div>
        </div>
    )
}

export default CardProduct;