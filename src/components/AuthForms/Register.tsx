import { Box, Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { createOwner } from "../../services/firebase";
import ErrorModal from "../Modal/ErrorModal";

type FormData = {
    email: string
    password: string
    name: string
    address: string
    phone: string
    website: string
};

const Register = () => {
    const { isLoggedin, login } = useContext(AuthContext)

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            address: "",
            phone: "",
            website: ""
        }, mode: "onTouched"
    })
    const [error, setError] = useState<Error>()

    const emailError = () => {
        if (errors.email?.type === 'required') return "Az email cím megadása kötelező!";
        if (errors.email?.type === 'pattern') return "Az email formátuma hibás!";
    }
    const passError = () => {
        if (errors.password?.type === 'required') return "A jelszó megadása kötelező!"
        if (errors.password?.type === 'minLength') return "A jelszónak legalább 6 karakterből kell állnia!"
    }

    const onSubmit = (data: FormData) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(response => {
                const { password, ...owner } = data
                createOwner(owner).then(user => login(user))
            })
            .catch(err => setError(err))
    }

    return (<>
        {isLoggedin && <Navigate to="/" replace={true} />}
        {error && <ErrorModal error={error}><Button onClick={() => setError(undefined)}>Újra probálom</Button></ErrorModal>}
        <Box display="flex" gap={3} p={5} flexDirection="column" component="form" noValidate autoComplete="off">
            <Controller
                name="email"
                control={control}
                rules={{
                    required: true, pattern: /.+@.+\..+/
                }}
                render={({ field }) => <TextField required type="email" error={!!errors.email} label="Email" variant="outlined" {...field} helperText={emailError()} />}
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => <TextField required type="password" error={!!errors.password} label="Jelszó" variant="outlined" {...field} helperText={passError()} />}
            />
            <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField required error={!!errors.name} label="Név" variant="outlined" {...field} helperText={!!errors.name && "A mező kitöltése kötelező"} />}
            />
            <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField required type="tel" error={!!errors.phone} label="Telefonszám" variant="outlined" {...field} helperText={!!errors.phone && "A mező kitöltése kötelező"} />}
            />
            <Controller
                name="address"
                control={control}
                render={({ field }) => <TextField error={!!errors.address} label="Cím" variant="outlined" {...field} />}
            />
            <Controller
                name="website"
                control={control}
                render={({ field }) => <TextField type="url" error={!!errors.website} label="Honlap" variant="outlined" {...field} />}
            />
            <Button variant="contained" data-testid="submit-register" onClick={handleSubmit(onSubmit)}>Regisztrálok</Button>
        </Box >
    </>)
}

export default Register;