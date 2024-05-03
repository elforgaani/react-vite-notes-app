import React, { ChangeEvent, useRef, useState } from 'react'
import Note from '../../interfaces/note';
import useDeleteNote from '../../hooks/useDeleteNote';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateNote from '../../hooks/useUpdateNote';

const ModifyNoteModal = ({ note }: { note: Note }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const queryClient = useQueryClient();
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const { mutate: deleteNote, isPending: isDeletePending, error: deleteError } = useDeleteNote();
    const handleDelete = () => {
        deleteNote(note._id!, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['notes'] })
                closeBtnRef.current?.click();
            }, onError: (error) => {
                console.log(error);

            }
        });
    }


    return <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col items-center gap-5">
                <input type="text" className='input input-bordered w-full max-w-xs' value={title} onChange={handleTitleChange} />
                <textarea value={content} onChange={handleChangeContent} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <div className="modal-action">
                    <button className="btn btn-primary">Save</button>
                    <button onClick={handleDelete} disabled={isDeletePending} className="btn btn-error">Delete</button>

                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button ref={closeBtnRef} className="btn btn-error">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}

export default ModifyNoteModal