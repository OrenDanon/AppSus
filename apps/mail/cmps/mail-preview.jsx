const { Fragment, useState } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {


    return (

        <tr>
            <td>*</td>
            <td>{mail.from}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>

        </tr>

    )
}