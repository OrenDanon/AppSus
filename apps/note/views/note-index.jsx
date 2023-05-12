const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

const NOTE_KEY = 'noteDB'
import { storageService } from '../../../services/storage.service.js'

import { NoteHeader } from "../cmps/note-header.jsx"
import { NoteFooter } from "../cmps/note-footer.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { DataTable } from "../cmps/data-table/data-table.jsx"
import { NoteDetails } from "../cmps/note-details.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [notes, setNotes] = useState(storageService.loadFromStorage(NOTE_KEY))

    console.log('notes from note service:', notes);

    useEffect(() => {
        loadNotes()
        showSuccessMsg('Welcome to note index!')
        setSearchParams(filterBy)
    }, [filterBy])

    function loadNotes() {
        noteService.query().then(notes => setNotes(notes))
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

    return (
        <section className="note-index full main-layout">
            <NoteHeader />

            <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <Link to="/note/edit">Add Note</Link>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            <DataTable notes={notes} />
            {/* <NoteDetails notes={notes} /> */}

            <NoteFooter />
        </section>
    )

}