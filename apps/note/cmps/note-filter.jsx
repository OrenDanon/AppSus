const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {

    // console.log('filterBy:', filterBy)
    // console.log('onSetFilter:', onSetFilter)

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))

        console.log('filterByToEdit from note filter', filterByToEdit)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    // ! DRY!. WE WILL NEVER REPEAT OUR SELVES
    // function handleTxtChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, txt: value }))
    // }

    // function handleMinSpeedChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, minSpeed: value }))
    // }

    const { info, MinCreatedAt, type } = filterByToEdit
    return (
        <section className="note-filter full main-layout">
            <h2>Filter Our Notes</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="infoTxt">Text:</label>
                <input value={info.txt} onChange={handleChange} type="text" name="infoTxt" id="infoTxt" placeholder="By Text" />

                <label htmlFor="MinCreatedAt">created At Min:</label>
                <input value={MinCreatedAt} onChange={handleChange} type="number" name="MinCreatedAt" id="MinCreatedAt" placeholder="By Date" />

                <label htmlFor="type">Type:</label>
                <input value={type} onChange={handleChange} type="text" name="type" id="type" placeholder="By Type" />

                <button>Filter Notes</button>
            </form>

        </section>
    )
}