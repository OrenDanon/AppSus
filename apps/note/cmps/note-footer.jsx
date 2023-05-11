const { useState } = React

import { ColorInput } from "./dynamic-inputs/color-input.jsx"
import { FontsizeInput } from "./dynamic-inputs/fontsize-input.jsx"

export function NoteFooter() {
    const [cmpType, setCmpType] = useState('color')
    const [noteFooterStyle, setNoteFooterStyle] = useState({
        backgroundColor: 'gray',
        fontSize: '16px'
    })

    function onSetNoteFooterStyle(newStyle) {
        setNoteFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    return <footer className="note-footer full main-layout" style={noteFooterStyle}>
        <h3>Hello from note footer</h3>
        <section>
            <select onChange={(ev) => { setCmpType(ev.target.value) }}>
                <option value="color">Color</option>
                <option value="fontSize">Font size</option>
            </select>
        </section>
        <section>
            <DynamicCmp cmpType={cmpType} name="Muki" onSetFooterStyle={onSetNoteFooterStyle} />
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