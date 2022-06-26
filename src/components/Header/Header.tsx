import { Menu as MenuIcon, Pets } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import NavButton from '../NavButton/NavButton';

const Header = () => {
    const { isLoggedin, logout } = useContext(AuthContext)
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return <>
        <AppBar position='static'>
            <Toolbar sx={{ gap: 1 }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, width: "100%" }}>
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
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <NavButton to="/" color="inherit"><Typography sx={{ fontWeight: 800 }} >Főoldal</Typography></NavButton>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <NavButton to="/kutyak" color="inherit">Kutyák</NavButton>
                        </MenuItem>
                        {isLoggedin ? <Box>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <NavButton to="/kutyaim" color="inherit">Kutyáim</NavButton>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <NavButton to="/profilom" color="inherit">Profilom</NavButton>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Button variant="outlined" color="inherit" onClick={logout}>Kilépés</Button>
                            </MenuItem>
                        </Box>
                            : <Box>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <NavButton to="/bejelentkezes" color="inherit">Bejelentkezés</NavButton>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <NavButton to="/regisztracio" variant="outlined" color="inherit">Regisztráció</NavButton>
                                </MenuItem>
                            </Box>
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    </>
}

export default Header