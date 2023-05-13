const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mailToEdit, setMailToEdit] = useState(null)
    //     const [nextMailId, setNextMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Loading mail details for mailId:', mailId)
        loadMail(mailId)
    }, [mailId])

    function markAsRead(mail) {
        const updatedMail = { ...mail, isRead: true }
        setMails([...mails.filter(mail => mail.id !== mailId), mailToEdit])
        setMailToEdit(updatedMail)
        mailService.update(updatedMail)
    }

    function loadMail(mailId) {
        console.log('Getting mail details...')
        mailService.get(mailId)
            .then(mail => {
                if (mail) {
                    setMailToEdit(mail)
                    if (!mail.isRead) markAsRead(mail)
                } else {
                    setMailToEdit('not-found')
                }
            })
            .catch(err => {
                console.log('Had issued in mail details:', err)
            })
    }


    //     function loadNextMailId() {
    //         mailService.getNextMailId(mailId)
    //             .then(setNextMailId)
    //     }

        function onBack() {
            navigate('/mail')
        }

    if (!mailToEdit) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h1>{mailToEdit.subject}</h1>
            <h4>{mailToEdit.from}</h4>
            <p>{mailToEdit.body}</p>
            <h4>Sent at: {new Date(mailToEdit.sentAt).toLocaleString()}</h4>
            <button onClick={onBack}>Back</button>
            {/* <Link to={`/mail/${nextMailId}`}>Next mail</Link> */}
        </section >
    )

}