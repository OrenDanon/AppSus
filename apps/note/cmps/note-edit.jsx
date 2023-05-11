const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        console.log(inputRef);
        if (params.noteId) loadNote()
    }, [])

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
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        if (!noteToEdit.vendor) {
            inputRef.current.focus()
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

    const { vendor, maxSpeed } = noteToEdit
    return (
        <section className="note-edit">
            <h2>{noteToEdit.id ? 'Edit' : 'Add'} Note</h2>

            <form onSubmit={onSaveNote} >
                <label htmlFor="vendor">Vendor:</label>
                <input ref={inputRef} onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="maxSpeed">Max Speed:</label>
                <input onChange={handleChange} value={maxSpeed} type="number" name="maxSpeed" id="maxSpeed" />

                <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}