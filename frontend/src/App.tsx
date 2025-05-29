import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthBox from './components/AuthBox/AuthBox'
import LoginBox from './components/LoginBox/LoginBox'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthBox />} />
          <Route path="/login" element={<LoginBox />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
