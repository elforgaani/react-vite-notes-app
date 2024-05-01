import { Link } from 'react-router-dom';
import img from '../assets/images/sign_up2.svg';

export const SignUp = () => {
  return <>
    <div className='flex justify-center items-center min-h-screen w-full p-8 bg-base-100 bg-gradient-to-b from-primary to-secondary'>
      <div className='rounded-xl shadow-xl grid grid-cols-1  md:grid-cols-2 w-full  p-14 md:p-12 bg-base-200 gap-x-4' >
        <div className="login-form flex flex-col justify-center items-center bg-base-200 gap-5">
          <h2 className=" text-3xl md:text-5xl uppercase text-primary">Notes App</h2>
          <p>Ready To Write Your Notes ?</p>
          <label className="input focus:outline-neutral focus-within:outline-neutral input-bordered flex items-center gap-2 w-full md:w-[60%] ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input focus:outline-neutral focus-within:outline-neutral input-bordered flex items-center gap-2 w-full md:w-[60%] ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" className="grow" placeholder="Email" />
          </label>
          <label className="input focus:outline-neutral focus-within:outline-neutral  input-bordered flex items-center gap-2 w-full md:w-[60%]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" placeholder="password" />
          </label>
          <div className='flex justify-end w-full md:w-[60%]'>
            <Link to='/forget-password' className='text-neutral'>Forget Password?</Link>
          </div>
          <button className="btn btn-primary w-full md:w-[30%] text-white  text-sm">Sign Up</button>
          {/* Todo: Need to be edited */}
          <div className='flex justify-start items-center flex-wrap w-full md:w-[60%]'>
            <p className='text-primary-content'>Already have an account?</p>
            <Link to='/sign-in' className='text-neutral'>Sign In</Link>
          </div>
        </div>
        <div>
          <img src={img} alt="Sign Up Vector" className='w-[80%] hidden md:block' />
        </div>
      </div>
    </div>
  </>
}

