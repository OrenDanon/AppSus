import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextNoteId,
    getPrevNoteId
}

function query(filterBy) {

    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (!filterBy) filterBy = noteService.getDefaultFilter()

            if (filterBy.info.txt) {
                const regExp = new RegExp(filterBy.info.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }

            if (filterBy.MinCreatedAt) {
                notes = notes.filter(note => note.createdAt >= filterBy.MinCreatedAt)
            }

            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regExp.test(note.type))
            }

            console.log('filterBy service:', filterBy)

            return notes
        })
        .catch(() => console.log('filterBy service problem:', filterBy))

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

function getPrevNoteId(noteId) {
    return asyncStorageService.query(NOTE_KEY)
        .then((notes) => {
            let noteIdx = notes.findIndex(note => note.id === noteId)
            if (noteIdx === 0) noteIdx = notes.length
            return notes[noteIdx - 1].id || 'n102'
        })
}

function getEmptyNote() {
    return { id: utilService.makeId(), createdAt: Date.now(), type: '', isPinned: false, style: { backgroundColor: '#bacee2' }, info: { txt: '' } }
}

function getDefaultFilter(searchParams = { get: () => { } }) {

    return {
        // info: searchParams.get('info') || { txt: '' },
        // MinCreatedAt: searchParams.get('createdAt') || '',
        // type: searchParams.get('type') || '',
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        info: { txt: '' },
        MinCreatedAt: '',
        type: ''

    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        const notes = [
            {
                id: 'n101',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#650066' },
                info: { txt: 'FullStack Me Baby!' }
            },

            {
                id: 'n102',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#7e0080' },
                info: { txt: 'HalfStack Me Woman!' }
            },

            {
                id: 'n103',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ca00cc' },
                info: { txt: 'QuarterStack Me Man!' }
            },
            {
                id: 'n104',
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#fc00ff' },
                info: {
                    txt: 'img',
                    url: '/assets//img/Fiat.jpg',
                    title: 'Bobi and Me'
                },
            },

            {
                id: 'n105',
                createdAt: Date.now(),
                type: 'NoteTodos',
                isPinned: false,
                style: { backgroundColor: '#fd33ff' },
                info: {
                    txt: 'todos',
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: 'Not Done Yet!' },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }

        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote() {
    const note = getEmptyNote()
    // id = utilService.makeId()
    return note
}
