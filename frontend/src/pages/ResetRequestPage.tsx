import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../api/auth';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const MAIN_LOGO_IMG = import.meta.env.VITE_MAIN_LOGO_IMG;

export default function ResetRequestPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      alert(t('resetRequest.fail'));
    }
  };

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const selectedLabel =
    languages.find((l) => l.code === i18n.language.split('-')[0])?.label || 'Language';

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
      {/* 언어 선택 */}
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

      {/* 비밀번호 재설정 */}
      <h3 style={{ fontSize: 20, marginBottom: 12 }}>{t('resetRequest.title')}</h3>
      {sent ? (
        <p style={{ color: '#2e7d32' }}>{t('resetRequest.success')}</p>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('resetRequest.emailPlaceholder')}
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
            {t('resetRequest.submit')}
          </button>
        </>
      )}

      {/* 로그인 페이지 이동 */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            fontSize: 13,
            background: 'transparent',
            border: 'none',
            color: '#777',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {t('resetRequest.backToLogin')}
        </button>
      </div>
    </div>
  );
}