import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { confirmPasswordReset } from '../api/auth';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const MAIN_LOGO_IMG = import.meta.env.VITE_MAIN_LOGO_IMG;

export default function ResetConfirmPage() {
  const { t, i18n } = useTranslation();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await confirmPasswordReset({ uid: uid!, token: token!, new_password: newPassword });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      alert(t('resetPassword.fail'));
    }
  };

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const selectedLabel = languages.find((l) => l.code === i18n.language.split('-')[0])?.label || 'Language';

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: 24,
        border: '1px solid #ccc',
        borderRadius: 8,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* 언어 드롭박스 */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            style={{
              padding: '6px 10px',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#f9f9f9',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {selectedLabel} ▾
          </button>
          {langOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                marginTop: 4,
                zIndex: 10,
              }}
            >
              {languages.map((l) => (
                <div
                  key={l.code}
                  onClick={() => handleLangChange(l.code)}
                  style={{
                    padding: '6px 10px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 로고 */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Link to="/">
          <img src={MAIN_LOGO_IMG} alt="AnTada 로고" style={{ height: 48 }} />
        </Link>
      </div>

      {/* 내용 */}
      <h3 style={{ fontSize: 20, marginBottom: 12 }}>{t('resetPassword.title')}</h3>
      {success ? (
        <p style={{ color: '#2e7d32' }}>{t('resetPassword.success')}</p>
      ) : (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('resetPassword.newPasswordPlaceholder')}
            style={{
              width: '100%',
              padding: 10,
              fontSize: 14,
              borderRadius: 4,
              border: '1px solid #ccc',
              marginBottom: 12,
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: 10,
              fontSize: 14,
              borderRadius: 4,
              border: 'none',
              background: '#ffb6c1',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {t('resetPassword.submit')}
          </button>
        </>
      )}
    </div>
  );
}