const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { noteService } from "../services/note.service.js"

export function NoteDetails() {
    const [note, setNote] = useState(null)
    const [nextNoteId, setNextNoteId] = useState(null)
    const [prevNoteId, setPrevNoteId] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote(noteId || 'n102')
        loadNextNoteId(noteId || 'n102')
        loadPrevNoteId(noteId || 'n102')
    }, [noteId])

    function loadNote(noteId) {
        noteService.get(noteId)
            .then(setNote)
            .catch(err => {
                console.log('Had issued in note details:', err);
                navigate('/note')
            })
    }

    function loadNextNoteId(noteId) {
        noteService.getNextNoteId(noteId)
            .then(setNextNoteId)
    }

    function loadPrevNoteId(noteId) {
        noteService.getPrevNoteId(noteId)
            .then(setPrevNoteId)
    }

    function onBack() {
        navigate('/note')
    }

    function getVidUrl() {
        var url = 'RGXZORCccbg'
        return `https://www.youtube.com/embed/${url}`
        // return note.info.url || 'https://www.youtube.com/watch?v=RGXZORCccbg&ab_channel=MatanMorag'
    }

    if (!note) return <div>Loading...</div>

    let noteTodos = []
    if (note.info.todos) {
        noteTodos = note.info.todos.map(todo => (`Text: ${todo.txt}, Done At:  ${todo.doneAt.toString() || ''}`))
    }

    return (
        <section className="note-details" style={note.style}>
            <h3>Note Title: {note.info.title || 'Empty'}</h3>
            <h3>Note Txt: {note.info.txt}</h3>

            <h3>Id: {note.id}</h3>
            <h3>Created At: {note.createdAt.toString()}</h3>

            <h3>Type: {note.type}</h3>
            <div>Note Todos List:
                {noteTodos.map(todo => <h4 key={utilService.makeId()} >{todo}</h4>) || 'Empty'}
            </div>
            <div>Note Image:
                <img src={note.info.url || '/assets/img/Bee.jpg'} alt="note image" key={utilService.makeId()} />
            </div>

            <button onClick={onBack}>Back</button>
            <button><Link to={`/note/details/${nextNoteId}`}>Next note</Link></button>
            <button><Link to={`/note/details/${prevNoteId}`}>Prev note</Link></button>
        </section >
    )

}
