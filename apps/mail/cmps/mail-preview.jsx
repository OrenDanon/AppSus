const { Fragment, useState } = React
const { Link, useNavigate } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    const navigate = useNavigate()


    const navigateToDetails = () => {
        navigate(`/mail/${mail.id}`)
    }

    return (
        <tr onClick={navigateToDetails} className={mail.isRead ? 'read' : 'unread'}>
            <td>*</td>
            <td>{mail.from}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
        </tr>
    )
}