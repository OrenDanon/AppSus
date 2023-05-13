import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId,
    update,
    findMailById,

}

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(emails => {
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
                emails = emails.filter(email => regExp.test(email.subject))
            }

            if (filterBy.status) {
                emails = emails.filter(email => email.status === filterBy.status)
            }

            if (filterBy.isStared) {
                emails = emails.filter(email => email.isStared === filterBy.isStarred)
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regExp.test(email.body) || regExp.test(email.subject) || regExp.test(email.from))
            }

            return emails
        })
    }


    // function query(filterBy = {}) {
    //     return asyncStorageService.query(MAIL_KEY)
    //         .then(emails => {
    //             if (filterBy.subject) {
    //                 const regExp = new RegExp(filterBy.subject, 'i')
    //                 emails = emails.filter(email => regExp.test(email.subject))
    //             }

    //             if (filterBy.status) {
    //                 emails = emails.filter(email => email.status === filterBy.status)
    //             }

    //             if (filterBy.isStared) {
    //                 emails = emails.filter(email => email.isStared === filterBy.isStarred)
    //             }

    //             return emails
    //         })
    // }



    function get(mailId) {
        return asyncStorageService.get(MAIL_KEY, mailId);
    }

    function update(mail) {
        return asyncStorageService.put(MAIL_KEY, mail)
    }

    // function get(mailId) {
    //     return asyncStorageService.get(MAIL_KEY, mailId)
    //     .then(mail => {
    //         mail.isRead = true
    //         return asyncStorageService.put(MAIL_KEY, mail)
    //         .then(() => mail)
    //     })
    // }

    function remove(mailId) {
        return asyncStorageService.remove(MAIL_KEY, mailId)
    }

    function save(mail) {
        if (mail.id) {
            return asyncStorageService.put(MAIL_KEY, mail)
        } else {
            return asyncStorageService.post(MAIL_KEY, mail)
        }
    }

    function getNextMailId(mailId) {
        return asyncStorageService.query(MAIL_KEY)
            .then((mails) => {
                let mailIdx = mails.findIndex(mail => mail.id === mailId)
                if (mailIdx === mails.length - 1) mailIdx = -1
                return mails[mailIdx + 1].id
            })
    }

    function getEmptyMail() {
        return {
            id: utilService.makeId(),
            subject: '',
            body: '',
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'user@appsus.com',
            to: ''
        }
    }

    // add keys of sentBy and sentTo
    function getDefaultFilter(searchParams) {
        if (searchParams.get) {
            return {
                txt: searchParams.get('txt'),
                status: searchParams.get('status'),
                isRead: searchParams.get('isRead'),
                isStarred: searchParams.get('isStarred')
            }
        } else {
            return {
                txt: '',
                status: 'inbox',
                isRead: null,
                isStarred: false
            }
        }
    }

    function findMailById(mailId, mails) {

        const mailIdx = mails.findIndex(mail => mail.id === mailId)
        return mails[mailIdx]
    }


    function _createMails() {
        let mails = storageService.loadFromStorage(MAIL_KEY)
        if (!mails || !mails.length) {
            mails = [
                {
                    id: utilService.makeId(),
                    status: 'inbox',
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1551133930695,
                    removedAt: null,
                    isStarred: false,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly Invoice',
                    status: 'inbox',
                    body: 'Your monthly invoice is here, you can watch it below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'donotreply@pango.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly expenses',
                    status: 'inbox',
                    body: 'Your monthly expenses report is here',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'info@max.max-finance.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your flight has been booked',
                    status: 'inbox',
                    body: 'Your flight aj850 has been booked for 09/07/2023',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'confirmation@easyJet.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your order has been shipped',
                    status: 'inbox',
                    body: 'Your order #KL7510 has been shipped',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'noreply@info.iherb.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Ride invoice',
                    status: 'inbox',
                    body: 'You can see your ride invoice down below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'dott@m.ridedott.com',
                    to: 'user@appsus.com'
                },
                {
                    id: utilService.makeId(),
                    status: 'inbox',
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1551133930695,
                    removedAt: null,
                    isStarred: false,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly Invoice',
                    status: 'inbox',
                    body: 'Your monthly invoice is here, you can watch it below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'donotreply@pango.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly expenses',
                    status: 'inbox',
                    body: 'Your monthly expenses report is here',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'info@max.max-finance.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your flight has been booked',
                    status: 'inbox',
                    body: 'Your flight aj850 has been booked for 09/07/2023',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'confirmation@easyJet.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your order has been shipped',
                    status: 'inbox',
                    body: 'Your order #KL7510 has been shipped',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'noreply@info.iherb.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Ride invoice',
                    status: 'inbox',
                    body: 'You can see your ride invoice down below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'dott@m.ridedott.com',
                    to: 'user@appsus.com'
                },
                {
                    id: utilService.makeId(),
                    status: 'inbox',
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1551133930695,
                    removedAt: null,
                    isStarred: false,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly Invoice',
                    status: 'inbox',
                    body: 'Your monthly invoice is here, you can watch it below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'donotreply@pango.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly expenses',
                    status: 'inbox',
                    body: 'Your monthly expenses report is here',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'info@max.max-finance.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your flight has been booked',
                    status: 'inbox',
                    body: 'Your flight aj850 has been booked for 09/07/2023',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'confirmation@easyJet.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your order has been shipped',
                    status: 'inbox',
                    body: 'Your order #KL7510 has been shipped',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'noreply@info.iherb.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Ride invoice',
                    status: 'inbox',
                    body: 'You can see your ride invoice down below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'dott@m.ridedott.com',
                    to: 'user@appsus.com'
                },
                {
                    id: utilService.makeId(),
                    status: 'inbox',
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1551133930695,
                    removedAt: null,
                    isStarred: false,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly Invoice',
                    status: 'inbox',
                    body: 'Your monthly invoice is here, you can watch it below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'donotreply@pango.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Monthly expenses',
                    status: 'inbox',
                    body: 'Your monthly expenses report is here',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'info@max.max-finance.co.il',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your flight has been booked',
                    status: 'inbox',
                    body: 'Your flight aj850 has been booked for 09/07/2023',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'confirmation@easyJet.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Your order has been shipped',
                    status: 'inbox',
                    body: 'Your order #KL7510 has been shipped',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'noreply@info.iherb.com',
                    to: 'user@appsus.com'
                },

                {
                    id: utilService.makeId(),
                    subject: 'Ride invoice',
                    status: 'inbox',
                    body: 'You can see your ride invoice down below',
                    isRead: false,
                    sentAt: 1551133930594,
                    removedAt: null,
                    isStarred: false,
                    from: 'dott@m.ridedott.com',
                    to: 'user@appsus.com'
                },
            ]
            console.log("Initializing mails:", mails);
            storageService.saveToStorage(MAIL_KEY, mails)
        }
    }