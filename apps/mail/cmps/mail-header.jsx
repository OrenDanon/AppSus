const { NavLink } = ReactRouterDOM


export function MailHeader() {

    return (
        <header className="mail-header full main-layout">
            <div className="mail-header-container">
                <h1>React Mail App</h1>
                <nav className="mail-nav">
                    <NavLink to="/mail/list" >List of mails</NavLink>
                    <NavLink to="/mail/table" >Table of mails</NavLink>
                    <NavLink to="/mail/details/:mailId" >Mail deatails</NavLink>
                    <NavLink to="/mail/edit/:mailId" >Edit mail</NavLink>
                </nav>
            </div>
        </header>
    )
}