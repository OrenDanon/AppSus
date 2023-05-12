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
    getNextNoteId
}

function query(filterBy) {

    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (!filterBy) filterBy = noteService.getDefaultFilter()

            if (filterBy.info.txt) {
                const regExp = new RegExp(filterBy.info.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))

                // notes = notes.filter(note => note.info.txt.includes(filterBy.info.txt))
            }

            if (filterBy.MinCreatedAt) {
                notes = notes.filter(note => note.createdAt >= filterBy.MinCreatedAt)
            }

            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regExp.test(note.type))

                // notes = notes.filter(note => note.type.includes(filterBy.type))
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
            // console.log('notes[noteIdx + 1]', notes[noteIdx + 1])
            return notes[noteIdx + 1].id
        })
}

function getEmptyNote(createdAt = Date.now(), type = '', isPinned = false, style = { backgroundColor: '#ddd' }, info = { txt: '' }) {
    return { id: '', createdAt, type, isPinned, style, info }
}

function getDefaultFilter(searchParams = { get: () => { } }) {

    return {
        // info: searchParams.get('info') || '',
        // MinCreatedAt: searchParams.get('createdAt') || '',
        // type: searchParams.get('type') || '',

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
                style: { backgroundColor: '#00B4DB' },
                info: { txt: 'FullStack Me Baby!' }
            },

            {
                id: 'n102',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#00B4DB' },
                info: { txt: 'HalfStack Me Woman!' }
            },

            {
                id: 'n103',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#00B4DB' },
                info: { txt: 'QuarterStack Me Man!' }
            }
        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(id = 33, createdAt, type, isPinned, style, info) {
    const note = getEmptyNote(createdAt, type, isPinned, style, info)
    note.id = utilService.makeId()
    return note
}


// const gNotes = [
//     {
//         id: 'n101',
//         createdAt: 1112222,
//         type: 'NoteTxt',
//         isPinned: true,
//         style: { backgroundColor: '#00B4DB' },
//         info: { txt: 'Fullstack Me Baby!' }
//     },

//     {
//         id: 'n102',
//         type: 'NoteImg',
//         isPinned: false,
//         info: {
//             url: 'http://some-img/me',
//             title: 'Bobi and Me'
//         },
//         style: { backgroundColor: '#00B4DB' }
//     },

//     {
//         id: 'n103',
//         type: 'NoteTodos',
//         isPinned: false,
//         info: {
//             title: 'Get my stuff together',
//             todos: [
//                 { txt: 'Driving license', doneAt: null },
//                 { txt: 'Coding power', doneAt: 187111111 }
//             ]
//         }
//     }
// ]
