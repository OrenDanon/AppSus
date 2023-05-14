import { utilService } from '../../../../services/util.service.js'

const { Fragment, useState } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ note, onRemoveNote }) {
    const [isExpanded, setIsExpanded] = useState(false)

    let noteTodos = []
    if (note.info.todos) {
        noteTodos = note.info.todos.map(todo => (`Text: ${todo.txt}, Done At:  ${todo.doneAt.toString() || ''}`))
    }


    return <Fragment>
        <tr className="note-table-row" style={note.style} onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>{note.info.title || 'Empty'}</td>
            <td>{note.info.txt}</td>

            <td>{note.id}</td>
            <td>{note.createdAt.toString()}</td>

            <td>{note.type}</td>
            <td>
                {noteTodos.map(todo => <p key={utilService.makeId()} >{todo}</p>) || 'Empty'}
            </td>
            <td>
                <img src={note.info.url || '/assets/img/Bee.jpg'} alt="note image" key={utilService.makeId()} />
            </td>
            <td>
                <button onClick={() => onRemoveNote(note.id)} >Remove</button>
                {/* <button><Link to={`/note/table/details/${note.id}`}> Details </Link></button> */}
                <button><Link to={`/note/details/${note.id}`}> Details </Link></button>
                {/* <button><Link to={`/note/table/edit/${note.id}`}> Edit </Link></button> */}
                <button><Link to={`/note/edit/${note.id}`}> Edit </Link></button>
            </td>
        </tr>
        {/* {
            isExpanded && <tr>
                <td colSpan="3">
                    <h4>Note Style BackgroundColor: {note.style.backgroundColor}</h4>
                </td>
            </tr>
        } */}
    </Fragment >

}
