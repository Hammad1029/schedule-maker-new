// import './App.css';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <Dashboard />
//   );
// }

// export default App;
// import "./App.css";
// import { Provider } from "react-redux";
// import { store } from "./store/index";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Provider store={store}>
//       <Dashboard />
//     </Provider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/Search";
import { Provider } from "react-redux";
import { store } from "./store/index";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
