import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthBox from './components/AuthBox/AuthBox'
import LoginBox from './components/LoginBox/LoginBox'
import SignUpBox from "./components/SignUpBox/SignUpBox";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthBox />} />
          <Route path="/login" element={<LoginBox />} />
          <Route path="/signup" element={<SignUpBox />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
