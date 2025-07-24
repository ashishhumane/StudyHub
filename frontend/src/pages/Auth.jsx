import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useLocation } from 'react-router-dom'

const Auth = () => {
  const [islogin, setislogin] = useState('login')

  const [response, setResponse] = useState({ status: null, message: '' });

  const location = useLocation();
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setLoginMessage(location.state.message);
      setTimeout(() => {
        setLoginMessage('')
      }, 1500);
    }
  }, [location]);

  return (
    <div className='w-full h-screen bg-white bg-cover bg-center flex justify-center items-center relative'>

      {
        response && response.status !== null ?
          <div className={`absolute top-2 right-3 ${response.status === 201 || response.status === 200 ? 'bg-green-600' : 'bg-red-600'} p-3 rounded-md`}>
            {response.message && (
              <p
                className={`text-center font-semibold ${response.status === 201 ? 'text-green-50' : 'text-red-50'
                  }`}
              >
                {response.status}: {response.message}
              </p>
            )}
          </div> :
          null
      }

      {
        loginMessage && (
          <div className="absolute top-2 right-3 bg-red-600 text-red-50 p-3 rounded-md shadow">
            {loginMessage}
          </div>
        )
      }

      <div className='w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 border bg-zinc-50 rounded-2xl shadow-xl backdrop-blur-md'>
        <div className='h-12 w-full flex'>
          <div
            onClick={() => setislogin('login')}
            className={`w-1/2 h-full flex justify-center items-center rounded-tl-2xl cursor-pointer transition-all duration-300 ${islogin === 'login' ? 'bg-gray-200 font-semibold' : 'bg-zinc-50 text-gray-500'
              }`}
          >
            SignIn
          </div>
          <div
            onClick={() => setislogin('signup')}
            className={`w-1/2 h-full flex justify-center items-center rounded-tr-2xl cursor-pointer transition-all duration-300 ${islogin === 'signup' ? 'bg-gray-200 font-semibold' : 'bg-zinc-50 text-gray-500'
              }`}
          >
            SignUp
          </div>
        </div>

        <div className="transition-opacity duration-300 ease-in-out p-4">
          {islogin === 'login' ? <Login setResponse={setResponse} /> : <Signup setResponse={setResponse} />}
        </div>
      </div>
    </div>

  )
}

export default Auth
