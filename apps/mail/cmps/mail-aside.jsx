const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

export function MailAside({ filterBy, onSetFilter, setIsDetails, mails }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()

    const calculateCounts = () => {
        const unreadCount = mails.filter(mail => !mail.isRead && mail.status === 'inbox').length
        return { unreadCount }
    }

    const { unreadCount } = calculateCounts()

    useEffect(() => {
        if (filterByToEdit) {
            onSetFilter(filterByToEdit)
            navigate('/mail')
        }
    }, [filterByToEdit])

    function onHandleStatus(newStatus) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, status: newStatus, isStarred: null }))
        setIsDetails(false)
    }

    function onStarred() {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, status: null, isStarred: true }))
        setIsDetails(false)
    }

    return (
        <aside>
            <ul>
                <li onClick={() => onHandleStatus('inbox')}><span>Inbox ({unreadCount})</span></li>
                <li onClick={() => onStarred()}><span>Starred</span></li>
                <li onClick={() => onHandleStatus('sent')}><span>Sent</span></li>
                <li onClick={() => onHandleStatus('trash')}><span>Trash</span></li>
            </ul>
        </aside>
    )
}
