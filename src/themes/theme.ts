import { Box, BoxProps } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

const primary = "#0A9396";
const secondary = "#101012";

export const appTheme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: primary,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        },
      },
    },
  },
});

export const FlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 32,
}));
