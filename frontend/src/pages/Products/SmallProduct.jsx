import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[10rem] ml-[2rem] p-2">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="pt-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex-col justify-normal items-center pr-2">
            <div>{product.name}</div>
            <div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mt-3 rounded-full dark:bg-pink-900 dark:text-pink-300">
              {product.price}<u>đ</u>
            </span>
            </div>
            
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;