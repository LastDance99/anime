import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../api/auth';
import { useTranslation } from 'react-i18next';

export default function ResetConfirmPage() {
  const { t } = useTranslation();
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
      alert(t('auth.resetPassword.fail'));
    }
  };

  return (
    <div>
      <h3>{t('auth.resetPassword.title')}</h3>
      {success ? (
        <p>{t('auth.resetPassword.success')}</p>
      ) : (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('auth.resetPassword.newPasswordPlaceholder')}
          />
          <button onClick={handleSubmit}>{t('auth.resetPassword.submit')}</button>
        </>
      )}
    </div>
  );
}