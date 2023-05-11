const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />

                {/* <Route path="/mail/list" element={<MailList mails={mails} onRemoveMail={onRemoveMail} />} />
                <Route path="/mail/table" element={<DataTable mails={mails} />} />
                <Route path="/mail/details" element={<MailDetails mails={mails} />} />
                <Route path="/mail/details/:mailId" element={<MailDetails mails={mails} />} />
                <Route path="/mail/edit" element={<MailEdit />} />
                <Route path="/mail/edit/:mailId" element={<MailEdit />} /> */}


                <Route path="/note" element={<NoteIndex />} />

                {/* <Route path="/note/list" element={<NoteList notes={notes} onRemoveNote={onRemoveNote} />} />
                <Route path="/note/table" element={<DataTable notes={notes} />} />
                <Route path="/note/details" element={<NoteDetails notes={notes} />} />
                <Route path="/note/details/:noteId" element={<NoteDetails notes={notes} />} />
                <Route path="/note/edit" element={<NoteEdit />} />
                <Route path="/note/edit/:noteId" element={<NoteEdit />} /> */}


            </Routes>
        </section>
    </Router>
}

