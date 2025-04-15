import React from 'react';
import { Link, useParams } from 'react-router';
import { useGetProductsQuery, useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from "../components/Loader";
import Header from '../components/Header';
import Message from "../components/Message";
import Product from './Products/Product';



const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError} = useGetProductsQuery({keyword});

  return <>
    {!keyword ? <Header /> : null}
    {isLoading ? <Loader /> : isError ? (<Message variant='danger'>
      {isError?.data.message || isError.error}
    </Message>) : (
      <>
        <div className="flex xl:justify-between justify-center gap-20 items-center">
          <h1 className="xl:ml-[20rem] mt-[5rem] text-[3rem]">
            Special Products
          </h1>

          <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10
          xl:mr-[18rem] mt-[5rem]">
            Shop
          </Link>
        </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
      </>
    )}
  </>
}

export default Home