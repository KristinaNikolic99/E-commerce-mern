import React from 'react';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import Message from '../../components/Message';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from "react-icons/fa"

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

  return <div className="md:mt-20 xl:mt-0 xl:block lg:block ">
    {isLoading ? null : error ? (
        <Message>
            {error?.data?.message || error.message}
        </Message>
    ) : <Slider {...settings} className='xl:w-[50rem] lg:w-[50rem] md:w-[42rem]
    flex w-[15rem]'>
            {
                products.map(({image, _id, name, price, description, brand, createdAt, numReviews,
                rating, quantity, countInStock}) => (
                    <div key={_id}>
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-full rounded-lg object-cover xl:h-[30rem] md:h-[30rem] h-[10rem]" 
                        />

                        <div className="flex justify-between w-[15rem]">
                            <div className="one">
                                <h2>{name}</h2>
                                <p>$ {price}</p> <br/> <br/>
                                <p className="w-[25rem] xl:block md:block hidden">{description.substring(0, 200)}...</p> 
                            </div>

                            <div className="flex flex-col xl:justify-between xl:flex-row w-[20rem] ml-12">
                                <div className="one">
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
                                    </h1>
                                </div>
                                <div className="two xl:ml-[2rem]">
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaStar className="mr-2 text-white" />{" "}
                                        Ratings: {Math.round(rating)}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaShoppingCart className="mr-2 text-white" />{" "}
                                        Quantity: {quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaBox className="mr-2 text-white" />{" "}
                                        In Stock: {countInStock}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Slider>}
  </div>
}

export default ProductCarousel