const Arrow = ({ direction, clickFunction, glyph }) => {
    return (
        <div className={`carousel-btn-${direction}`} onClick={clickFunction}>
            <img src={glyph} width="32" height="32" alt={direction} />
        </div>
    );
};

export default Arrow;
