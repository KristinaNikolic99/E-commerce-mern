import React from 'react';
import { useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from './Loader';
import SmallProduct from '../pages/Products/SmallProduct';
import ProductCarousel from '../pages/Products/ProductCarousel';

const Header = () => {

    const {data, isLoading, error} = useGetTopProductsQuery();
    
    if(isLoading) {
        return <Loader />
    }

    if(error) {
        return <h1>ERROR</h1>
    }

  return <>
    <div className="flex justify-center xl:justify-around flex-col xl:flex-row xl:ml-[5rem] md:ml-[5rem] ml-[2rem]">
        <div className="xl:block hidden md:block">
            <div  className="grid grid-cols-2">
                {data.map((product) => (
                    <div key={product._id}>
                        <SmallProduct product={product} />
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel />
    </div>
  </>
}

export default Header