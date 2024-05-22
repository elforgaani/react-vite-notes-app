import { ChangeEvent, useRef, useState } from 'react'
import Note from '../../interfaces/note';
import useDeleteNote from '../../hooks/useDeleteNote';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateNote from '../../hooks/useUpdateNote';
import Loading from '../common/Loading';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { appStrings } from '../../localization/app_strings';

const ModifyNoteModal = ({ note, isModalOpen, setIsModalOpen }: { note: Note, isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const queryClient = useQueryClient();
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const handleFinish = (): void => {
        queryClient.invalidateQueries({ queryKey: ['notes'] })
        closeBtnRef.current?.click();
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const { mutate: deleteNote, isPending: isDeletePending } = useDeleteNote();
    const { mutate: updateNote, isPending: isUpdatePending } = useUpdateNote();

    const handleDelete = () => {
        deleteNote(note._id!, {
            onSuccess: () => {
                handleFinish()
            }, onError: () => {
                toast.error('Something Went Wrong');
            }
        });
    }

    const handleUpdate = () => {
        updateNote({ id: note._id, title, content }, {
            onSuccess: () => {
                handleFinish()
            }, onError: (error) => {
                console.log(error);

                toast.error('Something Went Wrong');
            }
        })
    }
    return <>
        {isModalOpen &&
            <div className='background bg-[rgba(0,0,0,0.2)] absolute flex justify-center items-center top-0 left-0 right-0 bottom-0'>
                <div className='flex flex-col justify-center items-center bg-slate-50  gap-5 py-16  w-[90%] md:w-[30%]  rounded-xl'>
                    <input type="text" className='input input-bordered w-full max-w-xs' value={title} onChange={handleTitleChange} />
                    <textarea value={content} onChange={handleChangeContent} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                    <div className="modal-action gap-3">
                        <button onClick={handleUpdate} disabled={isUpdatePending} className="btn btn-primary">{isUpdatePending ? <Loading /> : t(appStrings.update)}</button>
                        <button onClick={handleDelete} disabled={isDeletePending} className="btn btn-error">{isDeletePending ? <Loading /> : t(appStrings.delete)}</button>
                        <button ref={closeBtnRef} onClick={() => setIsModalOpen(false)} className="btn btn-error">{t(appStrings.close)}</button>
                    </div>
                </div>
            </div>
        }
    </>
}

export default ModifyNoteModal