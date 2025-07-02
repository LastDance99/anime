import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUserProfile } from "../api/profile";

export default function ProfileRedirectLayout() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      try {
        const profile = await getUserProfile(Number(userId));
        localStorage.setItem("currentProfile", JSON.stringify(profile));
        navigate(`/profile/${profile.nickname}`, { replace: true });
      } catch (err) {
        console.error("❌ 프로필 리디렉션 실패:", err);
        navigate("/404", { replace: true });
      }
    };
    fetch();
  }, [userId, navigate]);

  return <div>{t("common.loading")}</div>;
}