export function NotePreview({ note }) {

    return (
        <article className="note-preview">
            <h2>Note Vendor: {note.vendor}</h2>
            <h4>Max Speed: {note.maxSpeed}</h4>
            <img src={`../assets/img/${note.vendor}.png`} alt="" />
        </article>
    )
}