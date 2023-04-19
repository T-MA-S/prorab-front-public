const ButtonModal = (props) => {
    return(
        <button className={`btn_custom_modal ${props.className}`} onClick={props.onClick}>
            {props.children}
            <span className="right_side__btn">
                {props.svg}
            </span>
        </button>
    )
}

export default ButtonModal;