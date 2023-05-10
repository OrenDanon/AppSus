const { Fragment, useState } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ note }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>{note.vendor}</td>
            <td>{note.maxSpeed}</td>
            <td>
                <Link to={`/note/${note.id}`}>Details</Link> |
                <Link to={`/note/edit/${note.id}`}>Edit</Link>
            </td>
        </tr>
        {
            isExpanded && <tr>
                <td colSpan="3">
                    <img src={`../assets/img/${note.vendor}.png`} style={{ maxWidth: '100px' }} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aliquid, voluptate odio eius quam sapiente. Odit quibusdam soluta ducimus doloribus fuga? Dolores magnam nulla placeat libero exercitationem quisquam unde suscipit?</p>
                </td>
            </tr>
        }
    </Fragment >

}
