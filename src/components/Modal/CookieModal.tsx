import { Button, Paper, Typography } from "@mui/material";
import Cookies from "universal-cookie";
import Modal from "./Modal";

const CookieModal = ({ setCookieConsent }: { setCookieConsent: React.Dispatch<any> }) => {

    const cookies = new Cookies();

    const cookieConsentHandler = () => {
        const date = new Date()
        date.setDate(date.getDate() + 30)
        cookies.set('consent', true, { path: '/', expires: date });
        setCookieConsent(cookies.get('consent'))
    }

    return <Modal>
        <Paper sx={{ width: "50%", p: 2 }}>
            <Typography variant="subtitle1">Az Ön adatainak védelme fontos a számunkra</Typography>
            <Typography variant="body2" py={1}>Annak érdekében, hogy személyre szabjuk a tartalmakat és hirdetéseket,közösségi média szolgáltatásokat nyújtsunk, valamint elemezzük látogatottságunkat, partnereinkkel együtt különböző technológiákat, például sütiket (cookie-kat) használunk oldalunkon. Kattintson az alábbi gombra ezen technológia webes használatának elfogadásához. Bármikor meggondolhatja magát, és erre az oldalra visszatérve megváltoztathatja hozzájárulási beállításait.</Typography>
            <Button variant="contained" onClick={cookieConsentHandler}>Elfogadom</Button>
        </Paper>
    </Modal>
}

export default CookieModal;