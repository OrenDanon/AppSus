import { DataTableRow } from "./data-table-row.jsx"

export function DataTable({ notes }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)


    return <table border="1">
        <thead>
            <tr>
                <th>Id</th>
                <th>Vendor</th>
                <th>Speed</th>
            </tr>
        </thead>
        <tbody>
            {notes.map(note => <DataTableRow key={note.id} note={note} />)}
        </tbody>
    </table>
}
