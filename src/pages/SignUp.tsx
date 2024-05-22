import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images/sign_up2.svg';
import { motion } from 'framer-motion';
import { useSignUpUser } from '../hooks/useSignUpUser';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { paths } from '../router/app_router';
import WarningAlert from '../components/common/WarningAlert';
import ErrorAlert from '../components/common/ErrorAlert';
import SignUpFormFields from '../interfaces/formField';
import toast from 'react-hot-toast';
import transitions from '../utils/transitions';
import { useTranslation } from 'react-i18next';
import { appStrings } from '../localization/app_strings';

export const SignUp = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();


  const { mutate, error, isPending } = useSignUpUser();
  const validationSchema = object({
    name: string().required().min(4).max(30),
    email: string().required().email(),
    password: string().required().min(8).max(16),
  })
  const initialValues: SignUpFormFields = {
    name: '',
    email: '',
    password: ''
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data): void => mutate(data, {
      onSuccess: () => {
        toast.success('Welcome to Notes App', { icon: '🎉' })
        navigator(paths.signIn)
      }
    }),
  });



  return <>
    <div className='flex justify-center items-center min-h-screen w-full p-8 bg-base-100 bg-gradient-to-b from-primary to-secondary'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col'>
          {error && <motion.div initial={transitions.container.hidden} animate={transitions.container.visible} ><ErrorAlert message={error.message} /></motion.div>}
          <motion.div variants={transitions.container} initial='hidden' animate="visible" className='rounded-xl shadow-xl grid grid-cols-1  md:grid-cols-2 w-full  p-14 md:p-12 bg-base-200 gap-x-4' >
            <div className="login-form flex flex-col justify-center items-center bg-base-200 gap-5">
              <h2 className=" text-3xl md:text-5xl uppercase text-primary">Notes App</h2>
              <p>Ready To Write Your Notes ?</p>
              <motion.label variants={transitions.item} className="input focus:outline-neutral focus-within:outline-neutral input-bordered flex items-center gap-2 w-full md:w-[60%] ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" className="grow" placeholder={t(appStrings.username)} name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </motion.label>
              {formik.touched.name && formik.errors.name &&
                <WarningAlert message={formik.errors.name} />
              }
              <motion.label variants={transitions.item} className="input focus:outline-neutral focus-within:outline-neutral input-bordered flex items-center gap-2 w-full md:w-[60%] ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" className="grow" placeholder={t(appStrings.email)} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' />
              </motion.label>
              {formik.touched.email && formik.errors.email &&
                <WarningAlert message={formik.errors.email} />
              }
              <motion.label variants={transitions.item} className="input focus:outline-neutral focus-within:outline-neutral  input-bordered flex items-center gap-2 w-full md:w-[60%]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" name='password' placeholder={t(appStrings.password)} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
              </motion.label>
              {formik.touched.password && formik.errors.password && <WarningAlert message={formik.errors.password} />
              }
              <motion.div variants={transitions.item} className='flex justify-end w-full md:w-[60%]'>
                <Link to='/forget-password' className='text-neutral'>Forget Password?</Link>
              </motion.div>
              <motion.button disabled={(!formik.isValid || isPending) ?? false} type='submit' variants={transitions.item} className="btn btn-primary w-full md:w-[30%] text-white  text-sm">{isPending ? 'Loading ..' : t(appStrings.signup)}</motion.button>
              {/* Todo: Need to be edited */}
              <motion.div variants={transitions.item} className='flex justify-start items-center flex-wrap w-full md:w-[60%]'>
                <p className='text-primary-content'>Already have an account?</p>
                <Link to={paths.signIn} className='text-neutral'>{t(appStrings.login)}</Link>
              </motion.div>
            </div>
            <div>
              <img src={img} alt="Sign Up Vector" className='w-[80%] hidden md:block' />
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  </>
}