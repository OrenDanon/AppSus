const { Fragment, useState } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ id, createdAt, type, isPinned, style, info }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>Id: {id}</td>
            <td>Created At: {createdAt}</td>
            <td>Type: {type}</td>
            <td>Is Pinned: {isPinned}</td>
            <td>Style: {style.backgroundColor}</td>
            <td>Info: {info.txt}</td>
            <td>
                <Link to={`/note/${id}`}>Details</Link> |
                <Link to={`/note/edit/${id}`}>Edit</Link>
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
