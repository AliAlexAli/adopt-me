import { Box, Grid, Skeleton } from "@mui/material";
import classes from "./PetProfile.module.css";

const PetDetailsSkeleton = (props: any) => {
    return (
        <Box className={`${props.className} ${classes.container}`}>
            <Skeleton id="skeleton-img" variant="rectangular" height="100vh" width="20rem" />
            <Box sx={{ px: 2, width: "100%", boxSizing: "border-box" }}>
                <Skeleton variant="text" width="50%" height="2rem" />
                <Grid container columns={3} columnSpacing={2} py={4}>
                    <Grid item sm={1}>
                        <Skeleton variant="rectangular" />
                    </Grid>
                    <Grid item sm={1}>
                        <Skeleton variant="rectangular" />
                    </Grid>
                    <Grid item sm={1}>
                        <Skeleton variant="rectangular" />
                    </Grid>
                </Grid>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Box>
        </Box>)
}

export default PetDetailsSkeleton;