import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthBox from './components/AuthBox/AuthBox';
import Login from './pages/LoginPage/Login';
import SignUp from "./pages/SignUpPage/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/mainpage" element={<MainPage />} />
          </Route>
          <Route path='/profile/:nickname' element={<ProfilePage />} />
          <Route path="/" element={<AuthBox />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
