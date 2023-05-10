const { useState } = React

import { ColorInput } from "./dynamic-inputs/colot-input.jsx"
import { FontsizeInput } from "./dynamic-inputs/fontsize-input.jsx"

export function AppFooter() {
    const [cmpType, setCmpType] = useState('color')
    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: 'gray',
        fontSize: '16px'
    })

    function onSetFooterStyle(newStyle) {
        setFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    return <footer className="app-footer full main-layout" style={footerStyle}>
        <h3>Hello from footer</h3>
        <section>
            <select onChange={(ev) => { setCmpType(ev.target.value) }}>
                <option value="color">Color</option>
                <option value="fontSize">Font size</option>
            </select>
        </section>
        <section>
            <DynamicCmp cmpType={cmpType} name="Muki" onSetFooterStyle={onSetFooterStyle} />
        </section>
    </footer>
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontsizeInput {...props} />
    }
}