import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/index";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;