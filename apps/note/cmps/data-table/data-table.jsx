import { DataTableRow } from "./data-table-row.jsx"

export function DataTable({ notes }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)


    return <table border="1">
        <thead>
            <tr>
                <th>Id</th>
                <th>Created At</th>
                <th>Type</th>
                <th>IsPinned</th>
                <th>Style</th>
                <th>Info</th>
                <th>Buttons</th>
            </tr>
        </thead>
        <tbody>
            {notes.map(note => <DataTableRow key={note.id} note={note} />)}
        </tbody>
    </table>
}
