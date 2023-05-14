const { NavLink } = ReactRouterDOM


export function NoteHeader() {

    return (
        <header className="note-header full main-layout">
            <div className="note-header-container">
                <h1>Keep App</h1>
                <nav className="note-nav">
                    <NavLink to="/note/list" >List of notes</NavLink>
                    <NavLink to="/note/table" >Table of notes</NavLink>
                    <NavLink to="/note/details" >Note deatails</NavLink>
                    <NavLink to="/note/edit" >Edit note</NavLink>
                </nav>
            </div>
        </header>
    )
}