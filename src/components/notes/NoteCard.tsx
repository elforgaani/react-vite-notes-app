
import { ReactNode, useState } from 'react'
import Note from '../../interfaces/note'
import ModifyNoteModal from './ModifyNoteModal';

const NoteCard = ({ note }: { note: Note }): ReactNode => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    return <>
        <div onClick={() => setIsModalOpen(true)
        } className="rounded-xl shadow-md w-70 h-52 m-3 flex flex-col cursor-pointer hover:bg-slate-200 hover:scale-[1.05] transition-all ">
            <h4 className="text-center whitespace-nowrap overflow-hidden text-ellipsis px-6 pt-6">{note.title}</h4>
            <div className="divider"></div>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis px-6 pb-6">{note.content}</p>
        </div>
        <ModifyNoteModal note={note} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
}

export default NoteCard