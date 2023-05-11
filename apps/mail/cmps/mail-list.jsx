const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview"

export function MailList({ mails, onTrashMail, onStarMail, }) {

    return ( 
        <section className="mail-list">

            <table>
                <tbody>
                    {mails.map(mail =>
                        <tr key={mail.id} className="mail-row" onClick={() => goToMailDetails(mail.id)}
                        >
                            {/* <td><MailStar mail={mail} /></td>  */}
                            
                            <MailPreview mail={mail} onTrashMail={onTrashMail}/>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
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