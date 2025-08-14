import React from 'react'
import {FacebookLogin, GoogleLogin} from './SocialLogin';

interface LoginComponentProps {
  username: string;
  password: string;
  error: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  submit: (e: React.FormEvent) => void;
}   

export const LoginComponent: React.FC<LoginComponentProps> = ({
  username,
  password,
  error,
  setUsername,
  setPassword,
  submit
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
      <div className="flex w-2/3 max-w-5xl h-[90vh] rounded-xl shadow-lg bg-white overflow-hidden">
        {/* Left Side */}
        <div className="basis-1/2 flex items-center justify-center">
        <div className="relative w-full h-full">
            <img
                src="/images/login-image.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative flex flex-col h-full w-full text-white p-8">
                <h1 className="text-3xl font-bold tracking-wide">Modella</h1>
                <div className="mt-auto mb-8">
                    <h2 className="text-2xl font-semibold">Welcome Back</h2>
                    <p className="text-lg text-gray-200 mt-2">
                        Get style recommendations, manage your wardrobe, and discover new trends.
                    </p>
                </div>
            </div>
        </div>
        </div>
        {/* Right Side */}
        <div className="basis-1/2 flex flex-col space-y-4 items-center justify-center px-16">
            <div className='flex flex-col items-center mb-6'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <p className='text-center text-gray-400'>Please enter your credentials to log in.</p>
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            {/* Normal form Login */}
          <form onSubmit={submit} className="w-full space-y-4">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black">Sign In</button>
            <p className="text-xs text-center text-gray-500">Forgot your password? <a href="/forgot-password" className="text-gray-700 underline hover:text-black">Reset here</a></p>
          </form>
            {/* Divider */}
            <div className='flex items-center justify-center w-full my-2'>
                <hr className="w-full my-4"/> <span className='mx-2 uppercase text-gray-400 font-bold text-[10px]'>Or</span> <hr className="w-full my-4"/>
            </div>
          {/* Social login */}
            <p className='text-gray-400 text-sm'>Login with social accounts</p>
          <div className="flex gap-2">
            <FacebookLogin />
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  )
}
