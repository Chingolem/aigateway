"use client";

import { useLanguage } from '../LanguageContext';
import { useState } from 'react';
import styles from './page.module.css';

const LITELLM_URL = process.env.NEXT_PUBLIC_LITELLM_URL ?? null;

const MOCK_STATS = [
  { labelEn: 'Total Requests', labelRu: 'Всего запросов', value: '—', icon: '📈' },
  { labelEn: 'Tokens Used', labelRu: 'Токенов потрачено', value: '—', icon: '🔢' },
  { labelEn: 'Balance', labelRu: 'Баланс', value: '—', icon: '💳' },
  { labelEn: 'Active Keys', labelRu: 'Активных ключей', value: '—', icon: '🔑' },
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | { valid: boolean; message: string }>(null);

  const handleCheck = async () => {
    if (!apiKey.trim()) return;
    setChecking(true);
    setResult(null);
    // Simulate API check
    await new Promise(r => setTimeout(r, 1200));
    setResult({ valid: false, message: t('Enter a valid key to see stats', 'Введите корректный ключ для просмотра статистики') });
    setChecking(false);
  };

  return (
    <div className={`${styles.page} animate-fade-in`}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>{t('API Dashboard', 'API Дашборд')}</h1>
          <p className={styles.subtitle}>
            {t('Monitor usage and manage your API keys', 'Следи за использованием и управляй своими API-ключами')}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        {MOCK_STATS.map((stat, i) => (
          <div key={i} className={`${styles.statCard} glass-panel`}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{t(stat.labelEn, stat.labelRu)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* API Key Check */}
      <div className={`${styles.checkCard} glass-panel`}>
        <div className={styles.checkCardHeader}>
          <h2 className={styles.checkCardTitle}>
            🔍 {t('Check API Key', 'Проверить API-ключ')}
          </h2>
          <p className={styles.checkCardSub}>
            {t('Enter your aigateway key to see usage statistics', 'Введите свой aigateway-ключ для просмотра статистики')}
          </p>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputPrefix}>sk-</span>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder={t('your-aigateway-key-here', 'ваш-aigateway-ключ')}
              className={styles.input}
              spellCheck={false}
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={checking || !apiKey.trim()}
            className={`btn-primary ${styles.checkBtn}`}
          >
            {checking ? (
              <span className={styles.spinner} />
            ) : (
              t('Check', 'Проверить')
            )}
          </button>
        </div>

        {result && (
          <div className={`${styles.result} ${result.valid ? styles.resultValid : styles.resultInvalid}`}>
            <span>{result.valid ? '✓' : '○'}</span>
            {result.message}
          </div>
        )}
      </div>

      <div className={`${styles.infoCard} glass-panel`}>
        <div className={styles.infoCardIcon}>🛠</div>
        <div>
          <h3 className={styles.infoCardTitle}>{t('LiteLLM Admin Panel', 'LiteLLM Админ-панель')}</h3>
          <p className={styles.infoCardText}>
            {LITELLM_URL ? (
              <>
                {t('Available at', 'Доступна по адресу')}{' '}
                <a href={`${LITELLM_URL}/ui`} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                  {LITELLM_URL}/ui
                </a>
                {' · '}
                {t('Password:', 'Пароль:')}{' '}
                <code>sk-master-key-for-gateway</code>
              </>
            ) : (
              <>
                {t('Set ', 'Укажи ')}
                <code>NEXT_PUBLIC_LITELLM_URL</code>
                {t(' in Vercel environment variables to link your LiteLLM deployment.', ' в переменных среды Vercel, чтобы привязать LiteLLM.')}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
