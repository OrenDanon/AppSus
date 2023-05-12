const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value

        if (field === 'info') {
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: { ['txt']: value } }))
        } else {
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        }

        console.log('filterByToEdit from note filter', filterByToEdit)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { info, MinCreatedAt, type } = filterByToEdit
    return (
        <section className="note-filter full main-layout">
            <h2>Filter Our Notes</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="info">Text:</label>
                <input value={info.txt} onChange={handleChange} type="text" name="info" id="info" placeholder="By Text" />

                <label htmlFor="MinCreatedAt">created At Min:</label>
                <input value={MinCreatedAt} onChange={handleChange} type="number" name="MinCreatedAt" id="MinCreatedAt" placeholder="By Date" />

                <label htmlFor="type">Type:</label>
                <input value={type} onChange={handleChange} type="text" name="type" id="type" placeholder="By Type" />

                <button>Filter Notes</button>
            </form>

        </section>
    )
}