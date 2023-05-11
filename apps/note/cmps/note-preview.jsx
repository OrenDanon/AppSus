export function NotePreview({ id, createdAt, type, isPinned, style, info }) {

    return (
        <article className="note-preview">
            <h3>Id: {id}</h3>
            <h3>Created At: {createdAt}</h3>
            <h3>Type: {type}</h3>
            <h3>Is Pinned: {isPinned}</h3>
            <h3>Style: {style.backgroundColor}</h3>
            <h3>Info: {info.txt}</h3>
        </article>
    )
}
