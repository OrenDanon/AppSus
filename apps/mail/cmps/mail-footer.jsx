// const { useState } = React

// import { ColorInput } from "./dynamic-inputs/color-input.jsx"
// import { FontsizeInput } from "./dynamic-inputs/fontsize-input.jsx"

// export function MailFooter() {
//     const [cmpType, setCmpType] = useState('color')
//     const [mailFooterStyle, setMailFooterStyle] = useState({
//         backgroundColor: 'gray',
//         fontSize: '16px'
//     })

//     function onSetMailFooterStyle(newStyle) {
//         setMailFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
//     }

//     return <footer className="mail-footer full main-layout" style={mailFooterStyle}>
//         <h3>Hello from mail footer</h3>
//         <section>
//             <select onChange={(ev) => { setCmpType(ev.target.value) }}>
//                 <option value="color">Color</option>
//                 <option value="fontSize">Font size</option>
//             </select>
//         </section>
//         <section>
//             <DynamicCmp cmpType={cmpType} name="Muki" onSetFooterStyle={onSetMailFooterStyle} />
//         </section>
//     </footer>
// }

// function DynamicCmp(props) {
//     switch (props.cmpType) {
//         case 'color':
//             return <ColorInput {...props} />
//         case 'fontSize':
//             return <FontsizeInput {...props} />
//     }
// }