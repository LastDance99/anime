import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthBox from './components/AuthBox/AuthBox';
import Login from './pages/LoginPage/Login';
import SignUp from "./pages/SignUpPage/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AniMain from "./pages/AnimationPage/AnimationPage";
import ProfileLayout from "./layouts/ProfileLayout";
import BoardPage from "./pages/BoardPage/BoardPage";
import MyAniListPage from "./pages/MyAniListPage/MyAniListPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/board" element={<BoardPage />} />
            <Route path="/anime" element={<AniMain />} />
          </Route>
          <Route element={<ProfileLayout />}>
            <Route path='/profile/:nickname' element={<ProfilePage />} />
            <Route path='/profile/:nickname/myanilist' element={<MyAniListPage />} />
          </Route>
          <Route path="/" element={<AuthBox />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
