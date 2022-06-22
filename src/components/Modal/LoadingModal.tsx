import { CircularProgress } from "@mui/material";
import Modal from "./Modal";

const LoadingModal = () => {
    return <Modal>
        <CircularProgress />
    </Modal>
}

export default LoadingModal;