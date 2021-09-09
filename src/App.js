import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterUrl from "./components/urlRoute/routeUrl";
import AuthProvider from "./Contexts/AuthContext";
import SideBar from "./components/sidebar/index";
function App() {
  return (
    <Router>
      <AuthProvider>
        <SideBar />
        <RouterUrl />
      </AuthProvider>
    </Router>
  );
}

export default App;
