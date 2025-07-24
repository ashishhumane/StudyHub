import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setResponse }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const res = await axios.post('http://localhost:3000/auth/login', {
                    email,
                    password
                }, {
                    withCredentials: true
                });

                setResponse({ status: res.status, message: res.data.message });

                setEmail('');
                setPassword('');

                setTimeout(() => setResponse(null), 1500);

                if (res.status === 200) {
                    setTimeout(() => {
                        navigate('/dashboard');
                        setResponse(null);
                    }, 2000);
                }
            } catch (err) {
                setResponse({
                    status: err.response?.status || 500,
                    message: err.response?.data?.message || 'Something went wrong',
                });
                setTimeout(() => setResponse(null), 2000);
            }
        }
    };

    return (
        <div className='w-full p-5 m-auto'>
            <div className='flex flex-col items-center'>
                <h2 className='text-3xl font-semibold'>Welcome back</h2>
                <h2 className='text-gray-500 italic'>Sign in to your account</h2>
            </div>
            <form onSubmit={handleLogin}>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-sm p-2'>Email:</label>
                    <input
                        type="text"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-slate-50 border-2 rounded-md outline-none p-2 text-zinc-700 hover:shadow-md transform duration-200'
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className='flex flex-col relative'>
                    <label htmlFor="password" className='text-sm p-2'>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-slate-50 border-2 rounded-md outline-none p-2 text-zinc-700 hover:shadow-md transform duration-200'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-2 bottom-0 -translate-y-1/2 text-sm text-blue-500"
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className='flex justify-center items-center pt-4'>
                    <input
                        type="submit"
                        value="Login"
                        className='bg-blue-600 py-2 px-4 rounded-md text-white font-semibold cursor-pointer hover:bg-blue-700 hover:shadow-md hover:scale-105 transform duration-200 flex-1'
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
