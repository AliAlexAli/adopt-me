import { Paper, Typography } from "@mui/material";
import Pet, { printAge } from "../../../services/dto/Pet";
import NavButton from "../../NavButton/NavButton";
import classes from "./PetContainer.module.css";

const PetContainer = (pet: Pet) => {

    return (<Paper variant="elevation" elevation={5} className={classes.container} sx={{ p: 1 }}>
        <img src={pet.image} alt="Dog's profile" />
        <div className={classes["container__text"]}>
            <Typography variant="h5">{pet.name}</Typography>
            <Typography>{`${pet.sex} - ${printAge(pet.birth)}`}</Typography>
            <Typography variant="body2">{`${pet.description.substring(0, 80)}...`}</Typography>
            <NavButton to={`/kutya/${pet.id}`} variant="contained">Tovább</NavButton>
        </div>
    </Paper>
    )
}

export default PetContainer;