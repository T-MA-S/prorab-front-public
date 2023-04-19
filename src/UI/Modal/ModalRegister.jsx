import Button from "../Button";
import ReactDOM from "react-dom";

const Backdrop = props =>{
    return <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.40)',
    }}
                onClick={props.onClick}
    ></div>
}

const ModalRegister = props => {
    return(
        <div className={props.className}>
                <div className={props.classNameTitle}>{props.title}</div>
                <Button classNameBtn={props.classNameBtn} onClick={props.onClick} titleBtn={props.titleBtn}></Button>
        </div>
    )
}

const PortalModal = props => {
    return(
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('modal_backdrop'))}
            {ReactDOM.createPortal(<ModalRegister className={props.className}
                                                  classNameTitle={props.classNameTitle}
                                                  title={props.title}
                                                  titleBtn={props.titleBtn}
                                                  onClick={props.onClick}
                                                  classNameBtn={props.classNameBtn}
            />, document.getElementById('modal_login'))}
        </>
    )
}

export default PortalModal;