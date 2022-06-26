import { Favorite, FilterAltOff } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ToggleButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, clearFilters, filters } from "../../../store/petSlice";
import { RootState } from "../../../store/store";
import { FlexBox } from "../../../themes/theme";

const PetSearch = () => {

    const filters = useSelector((state: RootState) => state.pet.filters)
    const [selected, setSelected] = useState(filters.favorite || false)
    const theme = useTheme();
    const dispatch = useDispatch()

    const changeHandler = (filterName: keyof filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        dispatch(applyFilters({ [filterName]: e.target.value }))
    }

    useEffect(() => {
        dispatch(applyFilters({ favorite: selected }))
    }, [selected])

    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        p: "20px 5px",
        m: "0 25px 60px",
        gap: 2,
        outline: `${theme.palette.primary.main} 40px solid`,
        borderRadius: "0 50px",
        boxSizing: "border-box",
        maxWidth: "100%",
    }}>
        <FlexBox>
            <TextField label="Név" onChange={changeHandler("name")} value={filters.name} />
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="size-select-label">Méret</InputLabel>
                <Select
                    labelId="size-select-label"
                    label="Méret"
                    value={filters.size || ""}
                    onChange={changeHandler("size")}
                >
                    <MenuItem value="">Mind</MenuItem>
                    <MenuItem value="Kicsi">Kicsi</MenuItem>
                    <MenuItem value="Közepes">Közepes</MenuItem>
                    <MenuItem value="Nagy">Nagy</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="sex-select-label">Nem</InputLabel>
                <Select
                    labelId="sex-select-label"
                    label="Nem"
                    value={filters.sex || ""}
                    onChange={changeHandler("sex")}
                >
                    <MenuItem value="">Mind</MenuItem>
                    <MenuItem value="Szuka">Szuka</MenuItem>
                    <MenuItem value="Kan">Kan</MenuItem>
                </Select>
            </FormControl>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => setSelected((prev) => !prev)}
            >
                <Favorite />
            </ToggleButton>
        </FlexBox >
        <Button variant="contained" color="secondary" onClick={() => { dispatch(clearFilters()); setSelected(false) }}><FilterAltOff /></Button>
    </Box>
}

export default PetSearch;