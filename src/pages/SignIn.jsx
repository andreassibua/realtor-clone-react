import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    return (
        <section>
            <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=826&t=st=1666199487~exp=1666200087~hmac=8082a82692f2d89ff8946d89b0914a0cc798ac1a049d8e6558df6792cd6a77e5" alt="sign in" className="w-full rounded-2" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form>
                        <input type="email" id="email" value={email} onChange={onChange} placeholder="Email address" className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                        <div className='relative mb-6'>
                            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder="Password" className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                            {
                                showPassword ?
                                    (<FiEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />) :
                                    (<FiEyeOff className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />)
                            }
                        </div>
                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className='mb-6'>
                                Don't have a account?
                                <Link to="/sign-up" className='text-red-400 hover:text-red-500 transition duration-200 ease-in-out'> Register</Link>
                            </p>
                            <p>
                                <Link to="/forgot-password" className='text-blue-400 hover:text-blue-500 transition duration-200 ease-in-out'>Forgot password?</Link>
                            </p>
                        </div>
                        <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign In</button>
                        <div className='my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                            <p className='text-center font-semibold mx-4'>OR</p>
                        </div>
                        <OAuth />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignIn