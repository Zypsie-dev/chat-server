import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpSide from "./Components/SignUp";
import SignInSide from "./Components/SignInSide";
import WelcomePage from "./Components/Welcome";
import Chat from "./Components/ChatApp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpSide />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
