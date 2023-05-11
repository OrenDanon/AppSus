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
                <Route path="/mail" element={<MailIndex />}>

                    <Route path="list" element={<MailList mails={mails} onRemoveMail={onRemoveMail} />} />
                    <Route path="table" element={<DataTable mails={mails} />} />
                    <Route path="details" element={<MailDetails mails={mails} />} />
                    <Route path="details/:mailId" element={<MailDetails mails={mails} />} />
                    <Route path="edit" element={<MailEdit />} />
                    <Route path="edit/:mailId" element={<MailEdit />} />

                </Route>


                <Route path="/note" element={<NoteIndex />}>

                    <Route path="list" element={<NoteList notes={notes} onRemoveNote={onRemoveNote} />} />
                    <Route path="table" element={<DataTable notes={notes} />} />
                    <Route path="details" element={<NoteDetails notes={notes} />} />
                    <Route path="details/:noteId" element={<NoteDetails notes={notes} />} />
                    <Route path="edit" element={<NoteEdit />} />
                    <Route path="edit/:noteId" element={<NoteEdit />} />

                </Route>


            </Routes>
        </section>
    </Router>
}

