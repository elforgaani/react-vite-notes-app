import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images/login-2.svg';
import { motion } from 'framer-motion';
import { useSingIn } from '../hooks/useSignIn';
import * as Yup from 'yup';
import { paths } from '../router/app_router';
import { useFormik } from 'formik';
import WarningAlert from '../components/common/WarningAlert';
import ErrorAlert from '../components/common/ErrorAlert';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atoms/userAtom';

export const SignIn = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userToken, setUserToken] = useRecoilState(userAtom);
  const navigator = useNavigate();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const { mutate, error, isPending } = useSingIn();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).max(20),
  });

  const handleSubmit = (body: object): void => {
    mutate(body, {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.token);
        setUserToken(data.token);
        toast.success('Welcome Back!', { icon: '👋' });
        setTimeout(() => navigator(paths.home), 2000)
      }
    })
  }

  const initialValues = {
    email: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  return <>
    <div className='flex justify-center items-center min-h-screen w-full p-8 bg-base-100 bg-gradient-to-b from-primary to-secondary'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col '>
          {error && <motion.div initial={container.hidden} animate={container.visible} ><ErrorAlert message={error.message} /></motion.div>}
          <motion.div variants={container} initial='hidden' animate='visible' className='rounded-xl shadow-xl grid grid-cols-1  md:grid-cols-2 w-full  p-14 md:p-12 bg-base-200 gap-x-4' >
            <div className="login-form flex flex-col justify-center items-center bg-base-200 gap-5">
              <h2 className=" text-3xl md:text-5xl uppercase text-primary">Notes App</h2>
              <p>Ready To Write Your Notes ?</p>
              <motion.label variants={item} className="input focus:outline-neutral focus-within:outline-neutral input-bordered flex items-center gap-2 w-full md:w-[60%] ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" className="grow" placeholder="Email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </motion.label>
              {
                formik.touched.email && formik.errors.email && <WarningAlert message={formik.errors.email} />
              }
              <motion.label variants={item} className="input focus:outline-neutral focus-within:outline-neutral  input-bordered flex items-center gap-2 w-full md:w-[60%]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" placeholder="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </motion.label>
              {
                formik.touched.password && formik.errors.password && <WarningAlert message={formik.errors.password} />
              }
              <motion.button disabled={(!formik.isValid || isPending) ?? false} type='submit' variants={item} className="btn btn-primary w-full md:w-[30%] text-white  text-sm">{isPending ? <PulseLoader color='white' /> : 'Sign In'}</motion.button>
              {/* Todo: Need to be edited */}
              <motion.div variants={item} className='flex flex-col md:flex-row justify-between items-center flex-wrap w-full md:w-[60%]'>
                <Link to={paths.signUp} className='text-secondary'>Create an account</Link>
                <Link to='/forget-password' className='text-secondary'>Forget Password?</Link>
              </motion.div>
            </div>
            <div>
              <img src={img} alt="Sign In Vector" className='w-full hidden md:block' />
            </div>
          </motion.div>
        </div>
      </form>
    </div>
    {/* <button onClick={()=> toast.success('Wow')}></button> */}
  </>
}

