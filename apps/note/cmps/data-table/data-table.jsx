import { DataTableRow } from "./data-table-row.jsx"

export function DataTable({ notes, onRemoveNote }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)


    return <table className="note-table" border="1">
        <thead>
            <tr>
                <th>Note Title</th>
                <th>Note Text</th>

                <th>Id</th>
                <th>Created At</th>

                <th>Type</th>
                <th>Todos List</th>
                <th>Image</th>
                <th>Buttons</th>
            </tr>
        </thead>
        <tbody>
            {notes.map(note => <DataTableRow key={note.id} note={note} onRemoveNote={onRemoveNote} />)}
        </tbody>
    </table>
}
