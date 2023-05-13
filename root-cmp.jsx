const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/cmps/mail-details.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"

import { NoteList } from "./apps/note/cmps/note-list.jsx"
import { DataTable } from "./apps/note/cmps/data-table/data-table.jsx"
import { NoteDetails } from "./apps/note/cmps/note-details.jsx"
import { NoteEdit } from "./apps/note/cmps/note-edit.jsx"


import { MailList } from "./apps/mail/cmps/mail-list.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />

                {/* <Route path="list" element={<MailList mails={mails} onRemoveMail={onRemoveMail} />} />
                    <Route path="edit" element={<MailEdit />} />
                    <Route path="edit/:mailId" element={<MailEdit />} /> */}

                <Route path="/note" element={<NoteIndex />}>

                    <Route path="list" element={<NoteList />} />
                    <Route path="table" element={<DataTable />} />
                    <Route path="details" element={<NoteDetails />} />
                    <Route path="details/:noteId" element={<NoteDetails />} />
                    <Route path="edit" element={<NoteEdit />} />
                    <Route path="edit/:noteId" element={<NoteEdit />} />

                </Route>

            </Routes>
        </section>
    </Router>
}