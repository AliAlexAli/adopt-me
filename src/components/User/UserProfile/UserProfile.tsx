import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import Owner from "../../../services/dto/Owner";
import { modifyOwner } from "../../../services/firebase";
import { FlexBox } from "../../../themes/theme";
import ErrorModal from "../../Modal/ErrorModal";

const UserProfile = () => {
    const user: Owner = useContext(AuthContext).user || { email: "", name: "", phone: "" }
    const updateUser = useContext(AuthContext).updateUser
    const [modifiedUser, setModifiedUser] = useState<Owner>(user)
    const [error, setError] = useState<Error>()

    const changeHandler = (key: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModifiedUser((prev) => { return { ...prev, [key]: e.target.value } })
    }

    const blurHandler = (key: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target.value) {
            setError({ message: `${key} mező nem lehet üres`, name: `EmptyField` })
            setModifiedUser((prev) => { return { ...prev, [key]: user[key] } })
        }
    }

    const clickHandler = () => {
        modifyOwner(modifiedUser)
        updateUser(modifiedUser)
    }

    return <FlexBox p={10} flexDirection="column">
        {error && <ErrorModal error={error}><Button onClick={() => setError(undefined)}>Rendben</Button></ErrorModal>}
        <TextField required label="Név" onChange={changeHandler("name")} onBlur={blurHandler("name")} value={modifiedUser.name} />
        <TextField type="tel" label="Telefon" onChange={changeHandler("phone")} value={modifiedUser.phone} />
        <TextField label="Cím" onChange={changeHandler("address")} value={modifiedUser.address} />
        <TextField label="Honlap" onChange={changeHandler("website")} value={modifiedUser.website} />
        <Button variant="contained" onClick={clickHandler}>Mentés</Button>
    </FlexBox>
}

export default UserProfile;