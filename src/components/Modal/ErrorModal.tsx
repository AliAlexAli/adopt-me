import { Alert, Typography } from "@mui/material";
import Modal from "./Modal";

interface Props {
    error: Error,
    children?: React.ReactNode,
}

const ErrorModal = ({ error, children }: Props) => {
    return <Modal>
        <Alert severity="error" action={
            children
        }>
            <Typography>{error.message}</Typography>
        </Alert>
    </Modal>
}

export default ErrorModal;