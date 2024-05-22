import useGetUserNotes from "../hooks/useGetUserNotes";
import Note from "../interfaces/note";
import NoteCard from "../components/notes/NoteCard";
import { motion } from "framer-motion";
import AddNoteModel from "../components/notes/AddNoteModel";
import { TbPencilPlus } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { CiLogout } from "react-icons/ci";
import transitions from "../utils/transitions";
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import { appStrings } from "../localization/app_strings";

/**
 * Home component represents the home page of the application.
 * It displays the user's notes and provides options to add new notes, change language, and log out.
 */
export const Home = () => {
    const { t } = useTranslation();
    const currentLang: string = i18n.language;
    const [, setUserToken] = useRecoilState(userAtom);

    /**
     * Logs out the user by removing the token from local storage and setting the user token to null.
     */
    const logOut = () => {
        localStorage.removeItem('token');
        setUserToken(null);
    }

    /**
     * Changes the language of the application.
     * @param lang The language code to change to.
     */
    const changeLanguage = (lang: string): void => {
        i18n.changeLanguage(lang);
        document.getElementById('root')?.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.lang = lang;
        document.getElementById('lang-dropdown')?.removeAttribute('open');
        console.log(i18n.language);
        localStorage.setItem('lang', lang);
    }

    const { isLoading, data } = useGetUserNotes();
    const locales: { key: string, value: string }[] = [{ key: 'ar', value: 'العربية' }, { key: 'en', value: 'English' }];

    return <>
        <div className='flex justify-center items-center min-h-screen min-w-full bg-gradient-to-b from-primary to-secondary'>
            <motion.section variants={transitions.container} initial='hidden' animate='visible' className='container bg-slate-100  h-[90vh] w-[90%] md:h-[90vh] md:w-[90%] shadow-xl rounded-xl flex flex-col '>
                <div className="flex justify-end items-center pt-5 px-5">
                    <h1 className='text-3xl md:text-4xl font-bold text-primary justify-self-center mx-auto text-center '>{t('your_note')}</h1>
                    <button className="btn btn-accent text-white transition-all rounded-lg " onClick={() => (document.getElementById('add-note-modal') as HTMLDialogElement).showModal()}>
                        <TbPencilPlus className="w-5 h-5" />
                        <span className="">{t(appStrings.addNote)}</span>
                    </button>
                    <div className="tooltip" data-tip={t(appStrings.logOut)}>
                        <button onClick={logOut} className="btn btn-error rounded-lg ms-3"><CiLogout color="white" size={25} /></button>
                    </div>
                    <div id="lang-dropdown" className="dropdown rounded-xl ms-3">
                        <div tabIndex={0} role="button" className="btn m-1">{t(appStrings.language)}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100  w-30 ">
                            {locales.map((locale) => <li key={locale.key}><button className={currentLang === locale.key ? 'text-primary' : ''} disabled={currentLang === locale.key} onClick={() => changeLanguage(locale.key)
                            }>{locale.value}</button></li>)}
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-4 overflow-y-scroll">
                    {data && data?.data.notes.reverse().map((note: Note) => <motion.div key={note._id} initial={transitions.item.hidden} whileInView={transitions.item.visible}  ><NoteCard note={note} /></motion.div>)}
                    {isLoading && Array.from({ length: 10 }).map((_, index) => <motion.div variants={transitions.item} key={index} className="skeleton w-70 h-52"></motion.div>)}
                </div>
            </motion.section >
            <AddNoteModel />
        </div >
    </>
}

