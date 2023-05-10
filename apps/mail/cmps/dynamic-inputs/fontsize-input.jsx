export function FontsizeInput({ name, onSetFooterStyle }) {
    const fontSizes = ['14px', '18px', '22px', '26px']


    function onChooseSize(fontSize) {
        const newStyle = { fontSize }
        onSetFooterStyle(newStyle)
    }

    return <section className="color-input">
        <div className="items-container">
            {
                fontSizes.map(fontSize => <div
                    className="item"
                    key={fontSize}
                    style={{ fontSize }}
                    onClick={() => onChooseSize(fontSize)}
                >
                    {fontSize}
                </div>)
            }
        </div>
        <p>Hello! {name} pick a font size!</p>
    </section>
}