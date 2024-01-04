import "./App.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/index";
import Dashboard from "./pages/Dashboard";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const { loading } = useSelector(state => state.app)
  return (
    <Provider store={store}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dashboard />
    </Provider>
  );
}

export default App;