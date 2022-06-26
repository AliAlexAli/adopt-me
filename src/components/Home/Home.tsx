import { Card, Grid, Stack, Typography } from "@mui/material";
import { FlexBox } from "../../themes/theme";
import classes from "./Home.module.css"

const Home = () => {
    return <FlexBox className={classes.container} alignItems="center" minHeight="100vh">
        <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "6rem" } }}>Találd meg az új kedvencedet!</Typography>
        <Grid container rowGap={2} columnGap={5} justifyContent="center" alignItems="stretch">
            <Grid item xs={11} md={5}>
                <Card sx={{ justifyContent: "center", p: 1 }} elevation={5} component={Stack}>
                    <Typography variant="h4">A "kutyák" fülre kattintva keresgélhetsz az elérhető kutyák közül.</Typography>
                </Card>
            </Grid>
            <Grid item xs={11} md={5}>
                <Card sx={{ justifyContent: "center", p: 1 }} elevation={5} component={Stack}>
                    <Typography variant="h4">Regisztrálj és töltsd fel a gazdára váló kutyáidat, hogy mások könnyen rátaláljanak.</Typography>
                </Card>
            </Grid>
        </Grid>
    </FlexBox >
}

export default Home;