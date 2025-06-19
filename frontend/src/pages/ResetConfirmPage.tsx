import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../api/auth';

export default function ResetConfirmPage() {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await confirmPasswordReset({ uid: uid!, token: token!, new_password: newPassword });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      alert("비밀번호 재설정에 실패했습니다.");
    }
  };

  return (
    <div>
      <h3>새 비밀번호 설정</h3>
      {success ? (
        <p>비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.</p>
      ) : (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
          />
          <button onClick={handleSubmit}>비밀번호 변경</button>
        </>
      )}
    </div>
  );
}