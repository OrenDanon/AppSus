import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
    },

    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: { backgroundColor: '#00d' }
    },

    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextNoteId
}

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }

            if (filterBy.minSpeed) {
                notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getNextNoteId(noteId) {
    return asyncStorageService.query(NOTE_KEY)
        .then((notes) => {
            let noteIdx = notes.findIndex(note => note.id === noteId)
            if (noteIdx === notes.length - 1) noteIdx = -1
            return notes[noteIdx + 1].id
        })
}

function getEmptyNote(createdAt, type = '', isPinned = false, style = { backgroundColor: '#ddd' }, info = { txt: '' }) {
    return { id: '', createdAt, type, isPinned, style, info }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        minSpeed: searchParams.get('minSpeed') || ''
    }
}

function _createNotes() {
    let notes = gNotes || storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(id = 007, createdAt, type, isPinned, style, info) {
    const note = getEmptyNote(createdAt, type, isPinned, style, info)
    note.id = utilService.makeId()
    return note
}
