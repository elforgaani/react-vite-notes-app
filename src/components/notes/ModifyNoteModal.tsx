import { ChangeEvent, useRef, useState } from 'react'
import Note from '../../interfaces/note';
import useDeleteNote from '../../hooks/useDeleteNote';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateNote from '../../hooks/useUpdateNote';
import Loading from '../common/Loading';
import { toast } from 'react-hot-toast';

const ModifyNoteModal = ({ note }: { note: Note }) => {
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
        updateNote({ id: note._id, title: note.title, content: note.content }, {
            onSuccess: () => {
                handleFinish()
            }, onError: (error) => {
                console.log(error);
                
                toast.error('Something Went Wrong');
            }
        })
    }

    return <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col items-center gap-5">
                <input type="text" className='input input-bordered w-full max-w-xs' value={title} onChange={handleTitleChange} />
                <textarea value={content} onChange={handleChangeContent} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <div className="modal-action">
                    <button onClick={handleUpdate} disabled={isUpdatePending} className="btn btn-primary">{isUpdatePending ? <Loading /> : 'Update'}</button>
                    <button onClick={handleDelete} disabled={isDeletePending} className="btn btn-error">{isDeletePending ? <Loading /> : 'Delete'}</button>

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