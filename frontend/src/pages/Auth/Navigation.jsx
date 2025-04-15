import React from 'react'
import { useState, useEffect } from 'react'
import {AiOutlineHome, 
    AiOutlineShopping, 
    AiOutlineLogin, 
    AiOutlineUserAdd, 
    AiOutlineShoppingCart} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import FavoritesCount from '../Products/FavoritesCount';

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    };

    const closeSidebar = () => {
        setShowSidebar(false)
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    } 

    useEffect(() => {
        if (!showSidebar) {
            setDropdownOpen(false);
        }
    }, [showSidebar])

  return (
    <div 
    style={{zIndex: 999}} 
    className={`
        flex flex-col justify-between text-white bg-black fixed top-0 left-0 h-full transition-all ease-in-out duration-300
        w-[20%]
        sm:w-[14%] md:w-[12%]  xl:w-[4%]
        hover:w-[26%] hover:md:w-[20%] hover:xl:w-[12%]
    `}
    id="navigation-container"
    onMouseEnter={toggleSidebar}
    onMouseLeave={closeSidebar}
    >
        <div className="ms-2 flex flex-col justify-center items-center space-y-4">
            <Link 
                to="/"
                className='flex items-center transition-transform transform
                hover:translate-x-2'
                id='link'
            >
                <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">HOME</span>
            </Link>
            <Link 
                to="/shop"
                className='flex items-center transition-transform transform
                hover:translate-x-2'
                id='link'
            >
                <AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
            </Link>
            <Link 
                to="/cart"
                className='flex items-center transition-transform transform
                hover:translate-x-2 '
                id='link'
            >
                <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">CART</span>
            </Link>
            <Link 
                to="/favorite"
                className='flex items-center transition-transform transform
                hover:translate-x-2 '
            >
                <FaHeart className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-name mt-[3rem]">FAVORITES</span>
                <FavoritesCount />
            </Link>
        </div>

        <div className="relative ms-2">
            <button onClick={toggleDropdown} 
            className='flex items-center text-gray-8000 focus:outline-none'>
                {userInfo ? (
                    <span className='text-white'>{userInfo.username}</span>
                ) : (
                    <></>
                )}

                {userInfo && (
                    <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-4 w-4 ml-1 ${
                        dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='white'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                             strokeWidth="2"
                             d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                    </svg>
                )}
            </button>
                    {dropdownOpen && userInfo &&(
                        <ul 
                            className={`absolute right-0 space-y-2 bg-white 
                            text-gray-600 w-full ${!userInfo.isAdmin ? '-top-20': 'bottom-8'
                            }`}
                        >
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>
                                        Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/productlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Users
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                onClick={logoutHandler}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                Logout
                                </button>
                            </li>

                        </ul>
                    )}
                    {!userInfo && (
                        <ul className='ms-2'>
                        <li>
                        <Link 
                            to="/login"
                            className='flex items-center transition-transform transform
                            hover:translate-x-2'
                        >
                            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26}/>
                            <span className="hidden nav-item-name mt-[3rem]">Login</span>
                        </Link>
                        </li>
                        <li>
                        <Link 
                            to="/register"
                            className='flex items-center transition-transform transform
                            hover:translate-x-2'
                        >
                            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26}/>
                            <span className="hidden nav-item-name mt-[3rem]">Register</span>
                        </Link>
                        </li>
                    </ul>
                    )}
        </div>
    </div>
  )
}

export default Navigation