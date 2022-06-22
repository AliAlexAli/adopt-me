import { Check, Close } from "@mui/icons-material";
import { Box, Grid, IconButton, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import Pet from "../../../../services/dto/Pet";
import { uploadImage } from "../../../../services/firebase";
import AttributeCard from "../../../AttributeCard/AttributeCard";
import classes from "./PetProfile.module.css";

interface Props { pet: Pet, closeFn: () => void, saveFn: (args: Pet) => void }

const PetDetailsEdit = ({ pet, closeFn, saveFn }: Props) => {
    const [modifiedPet, setModifiedPet] = useState<Pet>(pet)

    const changeHandler = (filterName: keyof Pet) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setModifiedPet((prev) => { return { ...prev, [filterName]: e.target.value } })
    }

    const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bd = e.target.valueAsDate || new Date()
        setModifiedPet((prev) => { return { ...prev, birth: bd } })
    }

    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) uploadImage(file).then(image => {
            setModifiedPet((prev) => { return { ...prev, image } })
        }

        )
    }

    return (<>
        <Box className={classes.container}>
            <div className={classes.image__container}><input id="abc" type="file" onChange={imageChangeHandler} />
            </div>
            <Box sx={{ px: 2, width: "100%", boxSizing: "border-box" }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }} >
                    <TextField inputProps={{ style: { fontSize: 50 } }} variant="standard" value={modifiedPet.name} onChange={changeHandler("name")} />
                    <Box>
                        <IconButton onClick={() => closeFn()}>
                            <Close style={{ fontSize: 60 }} />
                        </IconButton>

                        <IconButton onClick={() => saveFn(modifiedPet)}>
                            <Check style={{ fontSize: 60 }} />
                        </IconButton>
                    </Box>
                </Box>
                <Grid container columns={3} columnSpacing={2} py={4}>
                    <Grid item sm={1}>
                        <AttributeCard name="Születési dátum">{
                            <TextField variant="filled" type="date" value={modifiedPet.birth.toISOString().substring(0, 10)} onChange={dateChangeHandler} />
                        }</AttributeCard>
                    </Grid>
                    <Grid item sm={1}>
                        <AttributeCard name="Nem">{
                            <Select color="warning" fullWidth value={modifiedPet.sex} onChange={changeHandler("sex")}>
                                <MenuItem value="Szuka">Szuka</MenuItem>
                                <MenuItem value="Kan">Kan</MenuItem>
                            </Select>}</AttributeCard>
                    </Grid>
                    <Grid item sm={1}>
                        <AttributeCard name="Méret">{
                            <Select fullWidth value={modifiedPet.size} onChange={changeHandler("size")}>
                                <MenuItem value="Kicsi">Kicsi</MenuItem>
                                <MenuItem value="Közepes">Közepes</MenuItem>
                                <MenuItem value="Nagy">Nagy</MenuItem>
                            </Select>
                        }</AttributeCard>
                    </Grid>
                </Grid>
                <TextField variant="filled" multiline minRows={4} fullWidth value={modifiedPet.description} onChange={changeHandler("description")} />
            </Box>
        </Box></>)
}

export default PetDetailsEdit;