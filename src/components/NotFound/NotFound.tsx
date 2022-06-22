import { Box, Typography } from "@mui/material";
import NavButton from "../NavButton/NavButton";

const NotFound = () => {
    return <Box
        display="flex"
        gap={2}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <Typography variant="h4">Az oldal nem található</Typography>
        <NavButton to="/" variant="outlined">Vissza a főoldalra</NavButton>
    </Box>
}

export default NotFound;