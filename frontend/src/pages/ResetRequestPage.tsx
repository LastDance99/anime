import React, { useState } from 'react';
import { requestPasswordReset } from '../api/auth';
import { useTranslation } from 'react-i18next';

export default function ResetRequestPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    try {
      await requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      alert(t('auth.resetRequest.fail'));
    }
  };

  return (
    <div>
      <h3>{t('auth.resetRequest.title')}</h3>
      {sent ? (
        <p>{t('auth.resetRequest.success')}</p>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.resetRequest.emailPlaceholder')}
          />
          <button onClick={handleSubmit}>{t('auth.resetRequest.submit')}</button>
        </>
      )}
    </div>
  );
}