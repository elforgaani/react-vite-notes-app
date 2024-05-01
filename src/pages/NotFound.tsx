import { motion } from 'framer-motion';
import img from '../assets/images/pepe.png';


export const NotFound = () => {
    return <>
        <div className='flex flex-col justify-center items-center'>
            <motion.img initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, rotate: 360 }} transition={{ delay: 0.2, duration: 0.5 }} src={img} alt="Pepe the frog" className=' w-1/2' />
            <motion.p initial={{ y: -80, }} animate={{y:0}} className='text-xl md:text-3xl p-10'>Sorry, The page you are looking for in not found!</motion.p>
        </div>
    </>
}

