const { useEffect, useState } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, subject } = filterByToEdit
    return (
        <section className="mail-filter full main-layout">
            <h2>Filter Our Mails</h2>
            <button className="compose-btn">+ COMPOSE</button>
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="subject">Subject:</label>
                <input value={subject} onChange={handleChange} name="subject" id="subject" type="text" placeholder="By Subject" />

                <label htmlFor="txt">Body:</label>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="By Body" />

                <button id="filter-btn">Filter Mails</button>
            </form>
        </section>
    )
}