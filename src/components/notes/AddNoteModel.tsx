import { ChangeEvent, useRef, useState } from 'react'
import useAddNote from '../../hooks/useAddNote';
import { useQueryClient } from '@tanstack/react-query';
import Loading from '../common/Loading';
import { useTranslation } from 'react-i18next';
import { appStrings } from '../../localization/app_strings';

const AddNoteModel = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const { mutate, isPending } = useAddNote()
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();

    const handleSubmit = () => {
        mutate({ title, content }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['notes'] });
                closeBtnRef.current?.click();
            }
        })
    }

    return <>
        <dialog id="add-note-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col items-center gap-5 text-black">
                <input type="text" placeholder='Title' className='input input-bordered w-full max-w-xs' value={title} onChange={handleTitleChange} />
                <textarea value={content} placeholder='Content' onChange={handleContentChange} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <div className="modal-action gap-2">
                    <button onClick={handleSubmit} disabled={!title || !content || isPending} className="btn btn-primary">{isPending ? <Loading /> : t(appStrings.addNote)}</button>
                    <form method="dialog">
                        <button ref={closeBtnRef} className="btn btn-error">{t(appStrings.close)}</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}

export default AddNoteModel