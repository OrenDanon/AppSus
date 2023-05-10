import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

const EMAIL_KEY = 'emailDB'
_createEmails()

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
    return storageService.query(EMAIL_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = mails.filter(car => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
    // return axios.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', maxSpeed = '') {
    return { id: '', vendor, maxSpeed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 50))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}