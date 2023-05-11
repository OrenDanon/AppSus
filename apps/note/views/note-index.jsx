const { useEffect, useState } = React
const { Link, useSearchParams, Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter


import { NoteHeader } from "../cmps/note-header.jsx"
import { NoteFooter } from "../cmps/note-footer.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { DataTable } from "../cmps/data-table/data-table.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteDetails } from "../cmps/note-details.jsx"


export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
        showSuccessMsg('Welcome to note index!')
        setSearchParams(filterBy)
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
        // noteService.query().then(setNotes)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note (${noteId}) removed!`)
        })

    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    // console.log('render');
    return (
        <section className="note-index full main-layout">
            <NoteHeader />

            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/note/edit">Add Note</Link>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            <DataTable notes={notes} />
            <NoteDetails notes={notes} />

            <NoteFooter />
        </section>
    )


    // return <Router>
    //     <section className="note-index full main-layout">
    //         <NoteHeader />
    //         <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />

    //         <Routes>
    //             <Route path="/note/list" element={<NoteList notes={notes} onRemoveNote={onRemoveNote} />} />
    //             <Route path="/note/table" element={<DataTable notes={notes} />} />
    //             <Route path="/note/details/:noteId" element={<NoteDetails notes={notes} />} />
    //             <Route path="/note/edit/:noteId" element={<NoteEdit />} />
    //         </Routes>

    //         <NoteFooter />
    //     </section>
    // </Router>
}