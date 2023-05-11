const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)} >Remove</button>
                        {/* <button><Link to={`/note/${note.id}`} >Details</Link></button>
                        <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}