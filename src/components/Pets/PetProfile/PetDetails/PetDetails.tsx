import { Computer, Delete, Edit, Email, Favorite, FavoriteBorder, House, Phone } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AuthContext from "../../../../context/AuthContext";
import Owner from "../../../../services/dto/Owner";
import Pet, { printAge } from "../../../../services/dto/Pet";
import { deletePet, getOwner } from "../../../../services/firebase";
import AttributeCard from "../../../AttributeCard/AttributeCard";
import ErrorModal from "../../../Modal/ErrorModal";
import classes from "./PetProfile.module.css";

const PetDetails = ({ pet, setEditMode }: { pet: Pet, setEditMode: Dispatch<SetStateAction<boolean>> }) => {
    const cookies = useMemo(() => { return new Cookies() }, [])
    const [favorite, setFavorite] = useState<boolean>(cookies.get("favorites") ? cookies.get("favorites").includes(pet.id) : false)
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const userId = useContext(AuthContext).user?.id
    const navigate = useNavigate()
    const [owner, setOwner] = useState<Owner>()

    useEffect(() => {
        getOwner(pet.owner).then(response => setOwner(response))
    }, [pet.owner, setOwner])

    const favHandler = () => {
        setFavorite((prev) => !prev)
    }

    const deleteHandler = () => {
        setShowDelete(true)
    }

    useEffect(() => {
        const favs = cookies.get("favorites") ? cookies.get("favorites") : []
        const date = new Date()

        date.setFullYear(date.getFullYear() + 1)

        if (favorite) {
            if (!favs.includes(pet.id))
                favs.push(pet.id)
        }
        else {
            if (favs.includes(pet.id)) {
                favs.splice(favs.indexOf(pet.id), 1)
            }
        }

        cookies.set("favorites", favs, { expires: date, path: "/" })
    }, [favorite, pet.id, cookies])

    return (
        <Box className={classes.container}>
            {(showDelete) &&
                <ErrorModal error={{ name: "petDelete", message: "Biztosan törölni szeretné ezt az elemet?" }}>
                    <Button variant="contained" onClick={() => { deletePet(pet); navigate("/kutyaim") }}>Megerősítés</Button>
                    <Button variant="outlined" onClick={() => setShowDelete(false)}>Mégse</Button>
                </ErrorModal>
            }
            <Box>
                <img src={pet.image} alt="Dog's profile" />
                {owner &&
                    <List className={`${classes.list}`}>
                        <ListItem>Elérhetőségek</ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Email />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="E-mail" secondary={owner.email} />
                        </ListItem>
                        {owner.phone &&
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Phone />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Telefon" secondary={owner.phone} />
                            </ListItem>
                        }
                        {owner.website &&
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Computer />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Webhely" secondary={owner.website} />
                            </ListItem>
                        }
                        {owner.address &&
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <House />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Cím" secondary={owner.address} />
                            </ListItem>
                        }
                    </List>
                }
            </Box>
            <Box className={classes["flex-right"]}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }} >
                    <Typography variant="h2">{pet.name}</Typography>
                    <Box>
                        {userId === pet.owner && <IconButton onClick={deleteHandler}>
                            <Delete style={{ fontSize: 60 }} />
                        </IconButton>
                        }
                        {userId === pet.owner && <IconButton onClick={() => setEditMode(true)}>
                            <Edit style={{ fontSize: 60 }} />
                        </IconButton>
                        }
                        <IconButton onClick={favHandler}>
                            {(favorite)
                                ? <Favorite style={{ fontSize: 60 }} />
                                : <FavoriteBorder style={{ fontSize: 60 }} />}
                        </IconButton>
                    </Box>
                </Box>
                <Grid container columns={3} spacing={2} py={4}>
                    <Grid item xs={3} md={1}>
                        <AttributeCard name="Kor">{printAge(pet.birth)}</AttributeCard>
                    </Grid>
                    <Grid item xs={3} md={1}>
                        <AttributeCard name="Nem">{pet.sex}</AttributeCard>
                    </Grid>
                    <Grid item xs={3} md={1}>
                        <AttributeCard name="Méret">{pet.size}</AttributeCard>
                    </Grid>
                </Grid>
                <Typography fontSize={18}>{pet.description}</Typography>
            </Box>
        </Box>)
}

export default PetDetails;