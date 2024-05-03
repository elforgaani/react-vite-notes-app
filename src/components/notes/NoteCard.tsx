import React, { ChangeEvent, ReactNode, useState } from 'react'
import Note from '../../interfaces/note'
import ModifyNoteModal from './ModifyNoteModal';

const NoteCard = ({ note }: { note: Note }): ReactNode => {




    return <>
        <div onClick={() => document.getElementById('my_modal_5')!.showModal()} className="rounded-xl shadow-xl w-70 h-52 m-3 flex flex-col cursor-pointer hover:bg-slate-200 hover:scale-[1.1] transition-all ">
            <h4 className="text-center whitespace-nowrap overflow-hidden text-ellipsis px-6 pt-6">{note.title}</h4>
            <div className="divider"></div>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis px-6 pb-6">{note.content}</p>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <ModifyNoteModal note={note} />
        </div>
    </>
}

export default NoteCard