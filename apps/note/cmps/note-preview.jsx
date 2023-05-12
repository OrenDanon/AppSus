export function NotePreview({ note }) {

    return (
        <article className="note-preview">
            <h3>Id: {note.id}</h3>
            <h3>Created At: {note.createdAt}</h3>
            <h3>Type: {note.type}</h3>
            <h3>Is Pinned: {note.isPinned}</h3>
            <h3>Note Style BackgroundColor: {note.style.backgroundColor}</h3>
            <h3>Note Info Txt: {note.info.txt}</h3>
        </article>
    )
}

