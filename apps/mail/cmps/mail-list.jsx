const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview"

export function MailList({ mails, onTrashMail, onStarMail, }) {

    return <Fragment>
    
        <tr onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
        <td>{car.vendor}</td>
        <td>{car.maxSpeed}</td>
        <td>
            <Link to={`/car/${car.id}`}>Details</Link> |
            <Link to={`/car/edit/${car.id}`}>Edit</Link>
        </td>
    </tr>
    {
        isExpanded && <tr>
            <td colSpan="3">
            </td>
        </tr>
    }
</Fragment >
}


// import { MailPreview } from "./mail-preview.jsx";

// export function MailList({ mails, onRemoveMail }) {
//     return (
//         <ul className="mail-list">
//             {mails.map(mail =>
//                 <li key={mail.id}>
//                     <MailPreview mail={mail} />
//                     <section>
//                         <button onClick={() => onRemoveMail(mail.id)} >Remove</button>
//                         <button><Link to={`/mail/${mail.id}`} >Details</Link></button>
//                         <button><Link to={`/mail/edit/${mail.id}`} >Edit</Link></button>
//                     </section>
//                 </li>
//             )}
//         </ul>
//     )
// }