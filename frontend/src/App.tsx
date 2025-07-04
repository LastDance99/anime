import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthBox from './pages/AuthBox/AuthBox';
import Login from './pages/LoginPage/Login';
import SignUp from "./pages/SignUpPage/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AniMain from "./pages/AnimationPage/AnimationPage";
import ProfileLayout from "./layouts/ProfileLayout";
import BoardPage from "./pages/BoardPage/BoardPage";
import MyAniListPage from "./pages/MyAniListPage/MyAniListPage";
import MyBoardPage from "./pages/MyBoardPage/MyBoardPage";
import MyGalleryPage from "./pages/MyGalleryPage/MyGalleryPage";
import WritePage from "./pages/WritePage/WritePage";
import ChatbotLayout from "./layouts/ChatbotLayout";
import RequireAuth from "./components/RequireAuth";
import ResetConfirmPage from "./pages/ResetConfirmPage";
import ResetRequestPage from "./pages/ResetRequestPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* 🔓 로그인/회원가입/루트는 누구나 접근 가능 */}
        <Route path="/" element={<AuthBox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetRequestPage />} />
        <Route path="/reset-password/:uid/:token" element={<ResetConfirmPage />} />

        {/* 🔐 나머지는 전부 로그인 필요 */}
        <Route
          element={
            <RequireAuth>
              <ChatbotLayout />
            </RequireAuth>
          }
        >
          <Route element={<MainLayout />}>
            <Route path="/board" element={<BoardPage />} />
            <Route path="/anime" element={<AniMain />} />
            <Route path="/board/write" element={<WritePage />} />
            <Route path="/board/edit/:id" element={<WritePage mode="edit" />} />
          </Route>

          <Route path="/profile/:userId" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="myanilist" element={<MyAniListPage />} />
            <Route path="myboard" element={<MyBoardPage />} />
            <Route path="mygallery" element={<MyGalleryPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
