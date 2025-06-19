import React, { useState } from 'react';
import { requestPasswordReset } from '../api/auth';

export default function ResetRequestPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    try {
      await requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      alert("해당 이메일로 등록된 유저가 없습니다.");
    }
  };

  return (
    <div>
      <h3>비밀번호 재설정</h3>
      {sent ? (
        <p>이메일로 재설정 링크가 전송되었습니다.</p>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
          />
          <button onClick={handleSubmit}>링크 보내기</button>
        </>
      )}
    </div>
  );
}