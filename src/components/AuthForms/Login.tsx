import { Box, Button, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getOwnerByEmail } from "../../services/firebase";
import ErrorModal from "../Modal/ErrorModal";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { isLoggedin, login } = useContext(AuthContext);

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({ defaultValues: { email: "", password: "" }, mode: "onTouched" })
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
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(response => {
                getOwnerByEmail(response.user.email || "").then(user => login(user)).catch((err: any) => setError(err))
            }).catch((err: any) => setError(err))
    }

    return (<>
        {isLoggedin && <Navigate to="/" replace={true} />}
        {error && <ErrorModal error={error}><Button onClick={() => setError(undefined)}>Újra probálom</Button></ErrorModal>}
        <Box display="flex" gap={3} p={5} sx={{ minHeight: "100vh" }} flexDirection="column" component="form" noValidate autoComplete="off">
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
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Bejelentkezés</Button>
        </Box >
    </>)
}

export default Login;