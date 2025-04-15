import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({product}) => {
    return (
        <div className="md:w-[20rem] xl:w-[20rem] w-full xl:ml-[2rem] p-3">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[10rem] w-[12rem] rounded"
                />
                <HeartIcon product={product} />

            <div className="p-54">
                <Link to={`/product/${product._id}`}>  
                    <h2 className="flex justify-between items-center">
                        <div>{product.name}</div>
                        <span className="bg-pink-400 text-sm font-medium
                        mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            $ {product.price}
                        </span>
                    </h2>
                </Link>
            </div>
            </div>
        </div>
    )
};

export default SmallProduct