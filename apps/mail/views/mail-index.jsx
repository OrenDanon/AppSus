const { useEffect, useState } = React
const { Link, useSearchParams, Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

// import { MailHeader } from "../cmps/mail-header.jsx"
// import { MailFooter } from "../cmps/mail-footer.jsx"
// import { MailFilter } from "../cmps/mail-filter.jsx"
// import { DataTable } from "../cmps/data-table/data-table.jsx"
// import { MailDetails } from "../cmps/mail-details.jsx"
// import { MailEdit } from "../cmps/mail-edit.jsx"
// import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { EmailAside, MailAside } from "../cmps/mail-aside.jsx"

export function MailIndex() {

    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [mails, setMails] = useState([])

    // useEffect(() => {
    //     loadMails()
    //     showSuccessMsg('Welcome to mail index!')
    //     setSearchParams(filterBy)
    // }, [filterBy])

    useEffect(() => {
        loadMails()
    },[])

    function loadMails() {
        mailService.query().then(mails => setMails(mails))
    }

    // function onTrashMail(mailId) {
    //     mailService.remove(mailId).then(() => {
    //         const updatedMails = mails.filter(mail => mail.id !== mailId)
    //         setMails(updatedMails)
    //         showSuccessMsg(`Mail (${mailId}) removed!`)
    //     })

    // }

    // function onSetFilter(filterBy) {
    //     setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    // }

    // console.log('render');
    return (
        <section className="mail-index full main-layout">
            
            <MailList mails={mails}  />
            {/* <EmailAside onSetFilter={onSetFilter} filterBy={filterBy} setIsDetails={setIsDetails} /> */}
            {/* onTrashMail={onTrashMail} */}

            {/* <MailHeader /> */}
            {/* <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            {/* <MailDetails mails={mails} />
            <Link to="/mail/edit">Add Mail</Link> */}

            {/* <MailFooter /> */}
        </section>
    )
}

