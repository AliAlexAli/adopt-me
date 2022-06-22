import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Avatar, Typography, useTheme } from "@mui/material";
import { FlexBox } from "../../themes/theme";

const Footer = () => {
    const theme = useTheme()

    return (
        <FlexBox sx={{
            p: 3, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, alignItems: "center"
        }}>
            < Typography variant="overline" fontSize={20}> Adopt Me</Typography>
            <Avatar>
                <Facebook />
            </Avatar>
            <Avatar>
                <Instagram />
            </Avatar>
            <Avatar>
                <Twitter />
            </Avatar>
        </FlexBox >
    )
}

export default Footer;