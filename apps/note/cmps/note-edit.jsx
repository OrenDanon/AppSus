const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputTextRef = useRef()
    const inputTypeRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        console.log(inputTextRef);
        console.log(inputTypeRef);

        if (params.noteId) loadNote()
    }, [params])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Had issued in note edit:', err);
                navigate('/note')
                showErrorMsg('Note not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value

        if (field === 'info') setNoteToEdit(prevNote => ({ ...prevNote, [field]: { ['txt']: value } }))
        else setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        if (!noteToEdit.info.txt) {
            inputTextRef.current.focus()
            return
        }
        if (!noteToEdit.type) {
            inputTypeRef.current.focus()
            return
        }

        noteService.save(noteToEdit)
            .then(() => {
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                showErrorMsg('Can not save note!')
            })
    }

    const { info, type } = noteToEdit
    return (
        <section className="note-edit">
            <h2>{noteToEdit.id ? 'Edit' : 'Add'} Note</h2>

            <form onSubmit={onSaveNote} style={noteToEdit.style}>
                <label htmlFor="info">Text:</label>
                <input ref={inputTextRef} onChange={handleChange} value={info.txt} type="text" name="info" id="info" placeholder="Please Enter Your Text Note" />

                <label htmlFor="type">Type:</label>
                <input ref={inputTypeRef} onChange={handleChange} value={type} type="text" name="type" id="type" placeholder="Please Enter Your Type Note" />

                <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}
