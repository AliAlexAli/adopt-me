import { Card, Typography, useTheme } from "@mui/material"
import { ReactNode } from "react";

interface Props {
    name?: string,
    children?: ReactNode
}

const AttributeCard = ({ name, children }: Props) => {
    const theme = useTheme();

    return <Card elevation={3} sx={{ p: 1, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>
        {name ? <Typography variant="subtitle1">{name}</Typography> : ''}
        {children ? <Typography align="center" variant="h4">{children}</Typography> : ''}
    </Card>
}

export default AttributeCard