import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_API}/products/`)
            .then((res) => setProducts(res.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    title={product.title}
                    imageUrl={product.imageUrl}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default Products;
