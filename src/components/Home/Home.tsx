import { Typography } from "@mui/material";
import { FlexBox } from "../../themes/theme";
import classes from "./Home.module.css"
const Home = () => {
    return <FlexBox className={classes.container} alignItems="center" minHeight="100vh">
        <Typography variant="h1">Találd meg az új kedvencedet!</Typography>
    </FlexBox>
}

export default Home;