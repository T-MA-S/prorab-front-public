const Button = props => {
    return(
        <button className={props.classNameBtn}
                onClick={props.onClick}
        >
            {props.titleBtn}
        </button>
    )
}

export default Button;