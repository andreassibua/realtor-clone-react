import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    // const navigate = useNavigate()

    const { name, email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            updateProfile(auth.currentUser, {
                displayName: name,
            });
            const user = userCredential.user;
            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), formDataCopy);
            setFormData({
                name: "",
                email: "",
                password: ""
            });
            toast.success("Sign up was successfuly");
            navigate("/")
        } catch (error) {
            toast.error('Something went wrong with the registration!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <section>
            <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=826&t=st=1666199611~exp=1666200211~hmac=682e6c3baefccdbaa994b52c665c80d0df2ad5123281de94a48e343ff4b552b4" alt="sign in" className="w-full rounded-2" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <input type="text" id="name" value={name} onChange={onChange} placeholder="Full name" className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" required />
                        <input type="email" id="email" value={email} onChange={onChange} placeholder="Email address" className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" required />
                        <div className='relative mb-6'>
                            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder="Password" className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" required />
                            {
                                showPassword ?
                                    (<FiEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />) :
                                    (<FiEyeOff className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />)
                            }
                        </div>
                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className='mb-6'>
                                Have a account?
                                <Link to="/sign-in" className='text-red-400 hover:text-red-500 transition duration-200 ease-in-out'> Sign In</Link>
                            </p>
                            <p>
                                <Link to="/forgot-password" className='text-blue-400 hover:text-blue-500 transition duration-200 ease-in-out'>Forgot password?</Link>
                            </p>
                        </div>
                        <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">
                            Sign Up
                        </button>
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

export default SignUp