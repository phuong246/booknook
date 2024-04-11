import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[15rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="pt-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex-col justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-md font-medium mr-2 mt-4 rounded-full dark:bg-pink-900 dark:text-pink-300">
              {product.price}<u>đ</u>
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;