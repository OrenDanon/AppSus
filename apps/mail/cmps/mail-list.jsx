import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {
    console.log(mails)
    return (

        <table className="mails-list">

            <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
            </tbody>
        </table >

    )
}