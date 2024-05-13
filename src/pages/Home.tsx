import useGetUserNotes from "../hooks/useGetUserNotes"
import Note from "../interfaces/note";
import NoteCard from "../components/notes/NoteCard";
import { motion } from "framer-motion";
import AddNoteModel from "../components/notes/AddNoteModel";
import { TbPencilPlus } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { CiLogout } from "react-icons/ci";



export const Home = () => {
    const [_, setUserToken] = useRecoilState(userAtom);
    const logOut = () => {
        localStorage.removeItem('token');
        setUserToken(null);
    }
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
        hidden: { y: 20, opacity: 0, scale: 0 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3
            }
        }
    };
    const { isLoading, error, data } = useGetUserNotes();

    // useEffect(() => {
    //     mutate()
    // }, [])
    return <>
        <div className='flex justify-center items-center min-h-screen min-w-full bg-gradient-to-b from-primary to-secondary'>
            <motion.section variants={container} initial='hidden' animate='visible' className='container bg-slate-100  h-[90vh] w-[90%] md:h-[90vh] md:w-[90%] shadow-xl rounded-xl flex flex-col '>
                <div className="flex justify-end items-center pt-5 px-5">
                    <h1 className='text-3xl md:text-4xl font-bold text-primary justify-self-center mx-auto text-center '>Your Notes</h1>
                    <button className="btn btn-accent text-white transition-all rounded-lg " onClick={() => document.getElementById('add-note-modal')!.showModal()}>
                        <TbPencilPlus className="w-5 h-5" />
                        <span className="">Add Note</span>
                    </button>
                    <div className="tooltip" data-tip="Log out">
                        <button onClick={logOut} className="btn btn-error rounded-lg ms-3"><CiLogout color="white" size={25} /></button>
                    </div>
                    
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-4 overflow-y-scroll">
                    {data && data?.data.notes.reverse().map((note: Note) => <motion.div key={note._id} initial={item.hidden} whileInView={item.visible}  ><NoteCard note={note} /></motion.div>)}
                    {isLoading && Array.from({ length: 10 }).map((_, index) => <motion.div variants={item} key={index} className="skeleton w-70 h-52"></motion.div>)}
                </div>

            </motion.section>
            <AddNoteModel />
        </div>



    </>
}

