const { NavLink } = ReactRouterDOM


export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <div className="header-container">
                <h1>React Mail App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/mail" >Mails</NavLink>
                </nav>
            </div>
        </header>
    )
}