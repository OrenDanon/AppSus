// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

// import { mailService } from "../services/mail.service.js"

// export function MailDetails() {
//     const [mail, setMail] = useState(null)
//     const [nextMailId, setNextMailId] = useState(null)
//     const { mailId } = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         loadMail(mailId)
//         loadNextMailId(mailId)
//     }, [mailId])

//     function loadMail(mailId) {
//         mailService.get(mailId)
//             .then(setMail)
//             .catch(err => {
//                 console.log('Had issued in mail details:', err);
//                 navigate('/mail')
//             })
//     }

//     function loadNextMailId() {
//         mailService.getNextMailId(mailId)
//             .then(setNextMailId)
//     }

//     function onBack() {
//         navigate('/mail')
//     }

//     if (!mail) return <div>Loading...</div>
//     return (
//         <section className="mail-details">
//             <h1>Mail Vendor: {mail.vendor}</h1>
//             <h5>Max Speed: {mail.maxSpeed}</h5>
//             <img src={`../assets/img/${mail.vendor}.png`} alt="" />
//             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, velit reiciendis sed optio eum saepe! Aliquid necessitatibus atque est quasi unde odit voluptate! Vero, dolor sunt molestiae possimus labore suscipit?</p>
//             <button onClick={onBack}>Back</button>
//             <Link to={`/mail/${nextMailId}`}>Next mail</Link>
//         </section >
//     )

// }