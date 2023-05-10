const { NavLink } = ReactRouterDOM


export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <div className="header-container">
                <h1>React Note App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/note" >Notes</NavLink>
                </nav>
            </div>
        </header>
    )
}