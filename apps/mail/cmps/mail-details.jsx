const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    //     const [nextMailId, setNextMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail(mailId)
    }, [mailId])

    function loadMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)
            })
            .catch(err => {
                console.log('Had issued in mail details:', err)
            })
    }


    //     function loadNextMailId() {
    //         mailService.getNextMailId(mailId)
    //             .then(setNextMailId)
    //     }

    //     function onBack() {
    //         navigate('/mail')
    //     }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h1>{mail.subject}</h1>
            <h4>{mail.from}</h4>
            <p>{mail.body}</p>
            <h4>Sent at: {new Date(mail.sentAt).toLocaleString()}</h4>
            {/* <button onClick={onBack}>Back</button>
            <Link to={`/mail/${nextMailId}`}>Next mail</Link> */}
        </section >
    )

}