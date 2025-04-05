import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData, refetch } = useGetProductByIdQuery(params._id);
console.log(productData);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData?.name);
      setDescription(productData?.description);
      setPrice(productData?.price);
      setCategory(productData?.category);
      setQuantity(productData?.quantity);
      setBrand(productData?.brand);
      setImage(productData?.image);
      setStock(productData?.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      console.log(formData);
      console.log(params._id);

     const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`)
        refetch();
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try Again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`Product successfully deleted`);
      refetch();
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Product delete failed. Try Again.");
    }
  };

    return (
      <div className='flex justify-center'>
      <div className='flex-1'>
        <div className="flex flex-col md:flex-row gap-4">
          
          <AdminMenu />
  
            <div className='flex-1 p-6'>
              <div className='h-12 mb-6 text-xl font-bold'>
                Update / Delete Product
              </div>
  
              {image && (
                <div className="text-center">
                  <img 
                    src={image} 
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
                      onChange={e => {
                        console.log("Selected category:", e.target.value); // log the selected value
                        setCategory(e.target.value);
                      }}
                      value={category}
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
  
                <div className="w-1/3 flex md:flex-row justify-center gap-2">
                  <button 
                    onClick={handleSubmit} 
                    className='mt-3 py-4 px-10 rounded-lg text-lg font-bold bg-green-600 w-full'
                  >
                    Update  
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className='mt-3 py-4 px-10 rounded-lg text-lg font-bold bg-red-600 w-full'
                  >
                    Delete  
                  </button>
                </div>
                
  
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  };

export default ProductUpdate