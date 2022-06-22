import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import usePets from "../../hooks/usePets";
import Pet from "../../services/dto/Pet";
import { getPets } from "../../services/firebase";
import { setData } from "../../store/petSlice";
import { RootState } from "../../store/store";
import { FlexBox } from "../../themes/theme";
import ErrorModal from "../Modal/ErrorModal";
import LoadingModal from "../Modal/LoadingModal";
import NavButton from "../NavButton/NavButton";
import PetContainer from "./PetContainer/PetContainer";

const PetList = () => {

    const { page } = useParams()
    const pageNum = parseInt(page || "1")
    const pageLimit = 9
    const { pets, error, loading } = usePets<Pet[]>(getPets)
    const { filteredData, filters } = useSelector((state: RootState) => state.pet)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setData(pets ? pets : []))
    }, [pets])

    useEffect(() => {
        navigate("../1")
    }, [filters])

    return <FlexBox sx={{ minHeight: "100vh" }}>

        {(error) && <ErrorModal error={error} />}
        {(loading) && <LoadingModal />}
        {(!filteredData.length) && <Box textAlign="center"><Typography variant="h3">Nincs Találat</Typography>
            <Typography>Kérjük, módosítsa a keresést és próbálja meg újra.</Typography>
        </Box>
        }

        {filteredData.slice((pageNum - 1) * pageLimit, pageNum * pageLimit).map((pet, index) => <PetContainer key={index} {...pet} />)}

        <Grid container justifyContent="center" gap={2}>
            {(pageNum > 1) && <NavButton to={`../${pageNum - 1}`}>{`< Elöző`}</NavButton>}
            {(pageNum < Math.ceil(filteredData.length / pageLimit)) && <NavButton to={`../${pageNum + 1}`}>{`Következő >`}</NavButton>}
        </Grid>
    </FlexBox>
}

export default PetList;