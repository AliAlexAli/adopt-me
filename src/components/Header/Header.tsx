import { Pets } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import NavButton from '../NavButton/NavButton';

const Header = () => {
    const { isLoggedin, logout } = useContext(AuthContext)

    return <>
        <AppBar position='static'>
            <Toolbar sx={{ gap: 1 }}>
                <Box display="flex" sx={{ flexGrow: 1, gap: 1 }}>
                    <NavButton to="/" color="inherit"><Pets sx={{ transform: "translate(-1px, -0.2rem) rotate(22deg)" }} /><Typography sx={{ fontWeight: 800 }} >Adopt me</Typography></NavButton>
                    <NavButton to="/kutyak" color="inherit">Kutyák</NavButton>
                </Box>
                {isLoggedin ? <>
                    <NavButton to="/kutyaim" color="inherit">Kutyáim</NavButton>
                    <NavButton to="/profilom" color="inherit">Profilom</NavButton>
                    <Button variant="outlined" color="inherit" onClick={logout}>Kilépés</Button>
                </>
                    : <>
                        <NavButton to="/bejelentkezes" color="inherit">Bejelentkezés</NavButton>
                        <NavButton to="/regisztracio" variant="outlined" color="inherit">Regisztráció</NavButton>
                    </>

                }
            </Toolbar>
        </AppBar>
    </>
}

export default Header