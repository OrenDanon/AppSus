const { useEffect, useState } = React
const { useSearchParams, useParams } = ReactRouterDOM

// import { MailHeader } from "../cmps/mail-header.jsx"
// import { MailFooter } from "../cmps/mail-footer.jsx"
// import { MailDetails } from "../cmps/mail-details.jsx"
// import { MailEdit } from "../cmps/mail-edit.jsx"
// import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { MailAside } from "../cmps/mail-aside.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"

export function MailIndex() {
    const params = useParams()
    const { mailId } = params

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [isDetails, setIsDetails] = useState(false)
    const [mails, setMails] = useState([])
    const [mailToEdit, setMailToEdit] = useState(null)

    useEffect(() => {
        loadMails()
    }, [filterBy, mailId])

    function loadMails() {
        mailService.query(filterBy).then(mails => {
            setMails(mails)
            return mails
        }).then(mails => {
            const currMail = mailService.findMailById(mailId, mails);
            setMailToEdit(currMail)
        })
    }

    // function onTrashMail(mailId) {
    //     mailService.remove(mailId).then(() => {
    //         const updatedMails = mails.filter(mail => mail.id !== mailId)
    //         setMails(updatedMails)
    //         showSuccessMsg(`Mail (${mailId}) removed!`)
    //     })

    // }

    useEffect(() => {
        eventBusService.on('show-email-details', (emailId) => {
            setIsDetails(prevIsDetails => !prevIsDetails)
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
        })
    }, [])

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => {
            return { ...prevFilterBy, ...filterBy }
        })
    }

    return (
        <section className="full main-layout">
            <div className="mail-index">
                {<MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /> }
                <MailAside onSetFilter={onSetFilter} filterBy={filterBy} setIsDetails={setIsDetails} mails={mails} />
                <main>
                    <section className="main-container">
                        {!isDetails && <MailList mails={mails} />}
                        {mailToEdit && <MailDetails />}
                    </section>
                </main>
            </div>
        </section>
    )
}


{/* <MailHeader /> */ }
{/* <Link to="/mail/edit">Add Mail</Link> */ }
{/* <MailFooter /> */ }

