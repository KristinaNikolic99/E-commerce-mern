import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useCreateProductMutation,
  useUploadProductImageMutation
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';

const ProductList = () => {

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const {data: categories} = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("image", image);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);
      console.log('Create product response:', data);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
  <div className='flex justify-center'>
    <div className='flex-1'>
      <div className="flex flex-col md:flex-row gap-4">
        
        <AdminMenu />

          <div className='flex-1 p-6'>
            <div className='h-12 mb-6 text-xl font-bold'>
              Create Product
            </div>

            {imageUrl && (
              <div className="text-center">
                <img 
                  src={imageUrl} 
                  alt="product" 
                  className='block mx-auto max-h-[200px] w-auto' 
                />
              </div>
            )}

            <div className="mb-6">
              <label className='border text-white px-4 block w-full text-center
              rounded-lg cursor-pointer font-bold py-11'>
                {image ? image.name : "Upload Image"}

                <input 
                  type='file' 
                  name='image' 
                  accept='image/*'
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white" }
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-col justify-center sm:flex-row md:flex-row gap-4">
                <div className='one w-full sm:w-[100%] md:w-[48%] lg:w-[45%]'>
                  <label htmlFor="name">Name</label> <br />
                  <input 
                    type="text" 
                    className='p-4 mb-3 w-full border rounded-lg
                    bg-[#101011] text-white' 
                    value={name} onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className='two w-full sm:w-[100%] md:w-[48%] lg:w-[46%]'>
                  <label htmlFor="name block">Price</label> <br />
                  <input 
                   type="number" 
                    className=' p-4 mb-3 w-full border rounded-lg
                    bg-[#101011] text-white' 
                    value={price} onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center sm:flex-row md:flex-row gap-4">
                <div className='one w-full sm:w-[100%] md:w-[48%] lg:w-[45%]'>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input 
                    type="number" 
                    className='p-4 mb-3 w-full border rounded-lg
                    bg-[#101011] text-white' 
                    value={quantity} onChange={e => setQuantity(e.target.value)}
                  />
                </div>
                <div className='two w-full sm:w-[100%] md:w-[48%] lg:w-[46%]'>
                  <label htmlFor="name block">Brand</label> <br />
                  <input 
                    type="text" 
                    className=' p-4 mb-3 w-full border rounded-lg
                    bg-[#101011] text-white' 
                    value={brand} onChange={e => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center sm:flex-row md:flex-row gap-4">
                <div className='w-full sm:w-[100%] md:w-[48%] lg:w-[45%]'>
                  <label htmlFor="name block">Count In Stock</label> <br/>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className='w-full sm:w-[100%] md:w-[48%] lg:w-[45%]'>
                  <label htmlFor="">Category</label>
                  <select 
                    placeholder="Choose Category" 
                    className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} 
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className='flex'>Description</label>
              <textarea type="texts" className='p-2 mt-3  bg-[#101011]
              border rounded-lg text-white w-full'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button 
                onClick={handleSubmit} 
                className='mt-3 py-4 px-10 rounded-lg text-lg font-bold bg-pink-600 w-full'
              >
                Submit  
              </button>

            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default ProductList