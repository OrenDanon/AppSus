const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function MailEdit() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        console.log(inputRef);
        if (params.mailId) loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMailToEdit)
            .catch(err => {
                console.log('Had issued in mail edit:', err);
                navigate('/mail')
                showErrorMsg('Mail not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        if (!mailToEdit.vendor) {
            inputRef.current.focus()
            return
        }

        mailService.save(mailToEdit)
            .then(() => {
                navigate('/mail')
            })
            .catch(err => {
                console.log('Had issued in mail edit:', err);
                showErrorMsg('Can not save mail!')
            })
    }

    const { vendor, maxSpeed } = mailToEdit
    return (
        <section className="mail-edit">
            <h2>{mailToEdit.id ? 'Edit' : 'Add'} Mail</h2>

            <form onSubmit={onSaveMail} >
                <label htmlFor="vendor">Vendor:</label>
                <input ref={inputRef} onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="maxSpeed">Max Speed:</label>
                <input onChange={handleChange} value={maxSpeed} type="number" name="maxSpeed" id="maxSpeed" />

                <button>{mailToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}