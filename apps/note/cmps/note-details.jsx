const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteDetails() {
    const [note, setNote] = useState(null)
    const [nextNoteId, setNextNoteId] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote(noteId)
        loadNextNoteId(noteId)
    }, [noteId])

    function loadNote(noteId) {
        noteService.get(noteId)
            .then(setNote)
            .catch(err => {
                console.log('Had issued in note details:', err);
                navigate('/note')
            })
    }

    function loadNextNoteId() {
        noteService.getNextNoteId(noteId)
            .then(setNextNoteId)
    }

    function onBack() {
        navigate('/note')
    }

    if (!note) return <div>Loading...</div>
    return (
        <section className="note-details">
            <h1>Note Vendor: {note.vendor}</h1>
            <h5>Max Speed: {note.maxSpeed}</h5>
            <img src={`../assets/img/${note.vendor}.png`} alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, velit reiciendis sed optio eum saepe! Aliquid necessitatibus atque est quasi unde odit voluptate! Vero, dolor sunt molestiae possimus labore suscipit?</p>
            <button onClick={onBack}>Back</button>
            <Link to={`/note/${nextNoteId}`}>Next note</Link>
        </section >
    )

}