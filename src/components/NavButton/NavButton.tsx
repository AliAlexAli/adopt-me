import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
    to: string,
    children?: React.ReactNode,
    [rest: string]: any
}

const NavButton = ({ to, children, ...rest }: Props) => {

    const navigate = useNavigate();

    const navHandler = (path: string) => () => {
        return navigate(path)
    }

    return <Button onClick={navHandler(to)} {...rest}>{children}</Button>

}

export default NavButton;