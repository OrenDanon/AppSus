import { utilService } from '../../../services/util.service.js'


export function NotePreview({ note }) {

    let noteTodos = []
    if (note.info.todos) {
        noteTodos = note.info.todos.map(todo => (`Text: ${todo.txt}, Done At:  ${todo.doneAt.toString() || ''}`))
    }

    return (
        <article className="note-preview" style={note.style}>
            <h3>Id: {note.id}</h3>
            <h3>Created At: {note.createdAt.toString()}</h3>
            <h3>Type: {note.type}</h3>
            <h3>Text: {note.info.txt}</h3>
            <h3>Title: {note.info.title || 'Empty'}</h3>
            <div>
                <img src={note.info.url || '/assets//img/audi.jpg'} alt="note image" key={utilService.makeId()} />
            </div>
            <div>
                <h3>Todos List:</h3>
                {noteTodos.map(todo => <h5 key={utilService.makeId()} >{todo}</h5>) || 'Empty'}
            </div>
        </article>
    )
}

