import { DataTableRow } from "./data-table-row.jsx"

export function DataTable({ mails }) {
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
            {mails.map(mail => <DataTableRow key={mail.id} mail={mail} />)}
        </tbody>
    </table>
}
