import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import backgroundImg from "../../assets/sign.jpg";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}));
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

  return (
    <div>
        <section className='pl-[10rem] flex flex-wrap'>
            <div className="mr-[4rem] mt-[5rem] max-w-[40rem] w-full">
                <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

                <form onSubmit={submitHandler} className='container w-full'>
                    <div className="my-[2rem]">
                        <label 
                            htmlFor="email" 
                            className='block text-sm font-medium text-white'
                        >
                            Email Address
                        </label>

                        <input 
                            type="email" 
                            id='email' 
                            className='mt-1 p-2 border rounded w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                         />
                    </div>

                    <div className="my-[2rem]">
                        <label 
                            htmlFor="password" 
                            className='block text-sm font-medium text-white'
                        >
                            Password
                        </label>

                        <input 
                            type="password" 
                            id='password' 
                            className='mt-1 p-2 border rounded w-full'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                         />
                    </div>

                    <button 
                        disabled={isLoading} 
                        type='submit' 
                        className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                            {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {isLoading && <Loader />}
                </form>
                <div className="mt-4">
                    <p className="text-white">
                        New Customer ? {" "}
                        <Link 
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            className='text-pink-500 hover:underline'
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
            <img
                src={backgroundImg}
                alt=""
                className="h-[65rem] w-[59%] xl:block md:hidden hidden sm:hidden rounded-lg"
            />
        </section>
    </div>
  )
}

export default Login