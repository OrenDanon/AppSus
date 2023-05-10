
export function ColorInput({ name, onSetFooterStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

    function onChooseColor(color) {
        const newStyle= { backgroundColor: color }
        onSetFooterStyle(newStyle)
    }

    return <section className="color-input">
        <div className="items-container">
            {
                colors.map(color => <div
                    className="item"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChooseColor(color)}
                ></div>)
            }
        </div>
        <h3>Hello {name} pick a color!</h3>
    </section>
}