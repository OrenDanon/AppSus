const { useEffect, useState } = React
const { Link, useSearchParams, Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFooter } from "../cmps/mail-footer.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { DataTable } from "../cmps/data-table/data-table.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailEdit } from "../cmps/mail-edit.jsx"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
        showSuccessMsg('Welcome to mail index!')
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
        // mailService.query().then(setMails)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail (${mailId}) removed!`)
        })

    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    // console.log('render');
    return (
        <section className="mail-index full main-layout">
            <MailHeader />

            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/mail/edit">Add Mail</Link>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            <DataTable mails={mails} />
            <MailDetails mails={mails} />

            <MailFooter />
        </section>
    )

    // return <Router>
    //     <section className="mail-index full main-layout">
    //         <MailHeader />
    //         <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />

    //         <Routes>
    //             <Route path="/mail/list" element={<MailList mails={mails} onRemoveMail={onRemoveMail} />} />
    //             <Route path="/mail/table" element={<DataTable mails={mails} />} />
    //             <Route path="/mail/details" element={<MailDetails mails={mails} />} />
    //             <Route path="/mail/details/:mailId" element={<MailDetails mails={mails} />} />
    //             <Route path="/mail/edit" element={<MailEdit />} />
    //             <Route path="/mail/edit/:mailId" element={<MailEdit />} />
    //         </Routes>

    //         <MailFooter />
    //     </section>
    // </Router>
}
