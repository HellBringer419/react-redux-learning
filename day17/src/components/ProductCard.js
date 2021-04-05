const ProductCard = ({ title, imageUrl, description, price }) => {
    return (
        <div>
            <p>{title}</p>
            <img
                src={
                    process.env.REACT_APP_BACKEND_API +
                    "/" +
                    (imageUrl ? imageUrl : "images/default.jpg")
                }
                alt={title}
                width="100px"
                height="100px"
            />
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
};

export default ProductCard;
