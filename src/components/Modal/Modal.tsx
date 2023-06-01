import ReactDOM from "react-dom";
import classes from "./Modal.module.css"

const modalEl = document.getElementById('modal-root');

const Modal = (props: any) => {
    if(!modalEl) return <></>;
    return ReactDOM.createPortal(<div className={classes.modal}>{props.children}</div>, modalEl)
}

export default Modal;