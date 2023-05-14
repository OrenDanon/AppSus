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
                type: 'Text',
                isPinned: false,
                style: { backgroundColor: '#ca00cc' },
                info: {
                    title: 'Baby Boom',
                    txt: 'FullStack Me Baby!',
                },

            },

            {
                id: 'n102',
                createdAt: Date.now(),
                type: 'Text',
                isPinned: false,
                style: { backgroundColor: '#cf1ad1' },
                info: {
                    title: 'Girls Power',
                    txt: 'HalfStack Me Woman!',
                },

            },

            {
                id: 'n103',
                createdAt: Date.now(),
                type: 'Text',
                isPinned: false,
                style: { backgroundColor: '#d533d6' },
                info: {
                    title: 'Brotherhood',
                    txt: 'QuarterStack Me Man!'
                },
            },

            {
                id: 'n104',
                createdAt: Date.now(),
                type: 'Todos',
                isPinned: false,
                style: { backgroundColor: '#df66e0' },
                info: {
                    title: 'Get my stuff together',
                    txt: 'todos',
                    todos: [
                        { txt: 'Driving license', doneAt: 'Not Done Yet!' },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ],
                }
            },

            {
                id: 'n105',
                createdAt: Date.now(),
                type: 'Image',
                isPinned: false,
                style: { backgroundColor: '#da4ddb' },
                info: {
                    title: 'Sea Me Baby',
                    txt: 'img',
                    url: '/assets/img/Sea.jpg',
                },
            },

            // {
            //     id: 'n106',
            //     createdAt: Date.now(),
            //     type: 'Video',
            //     isPinned: false,
            //     style: { backgroundColor: '#e580e6' },
            //     info: {
            //         title: 'Learn Fast With Web Dev',
            //         txt: 'video',
            //         url: 'https://www.youtube.com/watch?v=CJJtA1NTqN4&ab_channel=WebDevSimplified',
            //     },
            // },
        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote() {
    const note = getEmptyNote()
    // id = utilService.makeId()
    return note
}
