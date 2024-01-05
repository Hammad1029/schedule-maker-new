import "./App.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/index";
import Dashboard from "./pages/Dashboard";
import { Backdrop, CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { NotificationContainer } from "react-notifications";

const colors = {
  main: "#700F1A"
}

function App() {
  const { loading } = useSelector(state => state.app)
  const { palette } = createTheme();
  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: colors.main,
        // dark: will be calculated from palette.primary.main,
        contrastText: "#fff",
        secondaryText: colors.main
      },
    },
    typography: {
      allVariants: {
        // color: 'white'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NotificationContainer />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;