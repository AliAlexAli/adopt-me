import { Add } from "@mui/icons-material"
import { Fab } from "@mui/material"
import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import { clearFilters, setOwner } from "../../store/petSlice"
import PetSearch from "./PetSearch/PetSearch"

const Pets = ({ own }: { own?: true }) => {
    const userId = useContext(AuthContext).user?.id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearFilters())
        if (own) dispatch(setOwner(userId))
        else dispatch(setOwner(""))
    }, [own, userId])

    return <>
        {(userId && own) && <Fab color="primary" onClick={() => navigate("./add")}><Add /></Fab>
        }
        <PetSearch />
        <Outlet />
    </ >
}

export default Pets
