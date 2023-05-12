const { Fragment, useState } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ note }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>Id: {note.id}</td>
            <td>Created At: {note.createdAt.toString()}</td>
            <td>Type: {note.type}</td>
            <td>Is Pinned: {`${note.isPinned}`}</td>
            <td>Note Style BackgroundColor: {note.style.backgroundColor}</td>
            <td>Note Info Txt: {note.info.txt}</td>
            <td>
                <Link to={`/note/${note.id}`}>Details</Link> |
                <Link to={`/note/edit/${note.id}`}>Edit</Link>
            </td>
        </tr>
        {
            isExpanded && <tr>
                <td colSpan="3">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aliquid, voluptate odio eius quam sapiente. Odit quibusdam soluta ducimus doloribus fuga? Dolores magnam nulla placeat libero exercitationem quisquam unde suscipit?</p>
                </td>
            </tr>
        }
    </Fragment >

}
