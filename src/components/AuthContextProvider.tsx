import { ReactNode, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext";
import Owner from "../services/dto/Owner";
import { getOwnerByEmail } from "../services/firebase";
import { auth } from "../services/firebase-config";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Owner>();
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

    const login = (u: Owner) => {
        setUser(u);
        setIsLoggedin(true);
    }

    const logout = () => {
        auth.signOut()
        setUser(undefined);
        setIsLoggedin(false);
    }

    const updateUser = (u: Owner) => {
        setUser(u);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
            if (user && user.email) login(await getOwnerByEmail(user.email));
        })

        return () => unsubscribe();
    }, []);


    const value = { user, isLoggedin, login, logout, updateUser };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;