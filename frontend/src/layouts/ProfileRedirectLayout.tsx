import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserProfile } from "../api/profile";

export default function ProfileRedirectLayout() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      try {
        const profile = await getUserProfile(Number(userId)); // ✅ id 기반 요청
        localStorage.setItem("currentProfile", JSON.stringify(profile)); // ⬅️ 닉네임 기반 페이지에서 활용
        navigate(`/profile/${profile.nickname}`, { replace: true }); // ✅ URL은 닉네임
      } catch (err) {
        console.error("❌ 프로필 리디렉션 실패", err);
        navigate("/404", { replace: true });
      }
    };
    fetch();
  }, [userId]);

  return <div>프로필 이동 중...</div>;
}