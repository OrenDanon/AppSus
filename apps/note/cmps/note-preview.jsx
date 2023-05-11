export function NotePreview({ vendor, maxSpeed }) {

    return (
        <article className="note-preview">
            <h2>Note Vendor: {vendor = 'audi'}</h2>
            <h4>Max Speed: {maxSpeed = 333}</h4>
            <img src={`../../../assets/img/audi.jpg`} alt="" />
        </article>
    )
}