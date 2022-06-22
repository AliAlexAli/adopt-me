import ReactDOM from "react-dom";
import classes from "./Modal.module.css"

const modalEl = document.getElementById('modal-root');

const Modal = (props: any) => {

    return ReactDOM.createPortal(<div className={classes.modal}>{props.children}</div>, modalEl!)
}

export default Modal;