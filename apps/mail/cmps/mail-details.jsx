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
        // loadNextMailId(mailId)
    }, [mailId])

    function loadMail(mailId) {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
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
            <h5>{mail.body}</h5>
            {/* <button onClick={onBack}>Back</button>
            <Link to={`/mail/${nextMailId}`}>Next mail</Link> */}
        </section >
    )

}