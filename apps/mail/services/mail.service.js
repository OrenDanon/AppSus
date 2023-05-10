import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId
}

const gEmails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },

    {
        id: 'e102',
        subject: 'Monhly Invoice',
        body: 'Your monthly invoice is here, you can watch it below',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'donotreply@pango.co.il',
        to: 'user@appsus.com'
    },

    {
        id: 'e103',
        subject: 'Monthly expenses',
        body: 'Your monthly expenses report is here',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'info@max.max-finance.co.il',
        to: 'user@appsus.com'
    },

    {
        id: 'e104',
        subject: 'Your flight has been booked',
        body: 'Your flight aj850 has been booked for 09/07/2023',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'confirmation@easyJet.com',
        to: 'user@appsus.com'
    },

    {
        id: 'e105',
        subject: 'Your order has been shipped',
        body: 'Your order #KL7510 has been shipped',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'noreply@info.iherb.com',
        to: 'user@appsus.com'
    },

    {
        id: 'e106',
        subject: 'Ride invoice',
        body: 'You can see your ride invoice down below',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'dott@m.ridedott.com',
        to: 'user@appsus.com'
    }

]

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.vendor))
            }

            if (filterBy.minSpeed) {
                mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if(mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}

function getEmptyMail(vendor = '', maxSpeed = '') {
    return { id: '', vendor, maxSpeed }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        minSpeed: searchParams.get('minSpeed') || ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('audu', 300))
        mails.push(_createMail('fiak', 120))
        mails.push(_createMail('subali', 50))
        mails.push(_createMail('mitsu', 150))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(vendor, maxSpeed = 250) {
    const mail = getEmptyMail(vendor, maxSpeed)
    mail.id = utilService.makeId()
    return mail
}