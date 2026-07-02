"use client";

import { useLanguage } from '../LanguageContext';
import { useState } from 'react';
import styles from './dashboard.module.css';

const LITELLM_URL = process.env.NEXT_PUBLIC_LITELLM_URL ?? null;

export default function DashboardPage() {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);

  const handleCheck = async () => {
    if (!apiKey.trim()) return;
    setChecking(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 1000));
    setResult({ ok: false, msg: t('Stats will appear here after connecting to the gateway.', 'Статистика появится здесь после подключения к шлюзу.') });
    setChecking(false);
  };

  return (
    <div className={styles.page}>

      {/* Telegram notice */}
      <div className={styles.notice}>
        <div className={styles.noticeText}>
          <strong>{t('Plans — via Telegram', 'Покупка тарифов — в Telegram')}</strong>
          <p>{t('Buy or renew a plan through our bot. Payment in minutes, key issued right after purchase.', 'Купить или продлить тариф можно через нашего бота. Оплата за пару минут, ключ выдаётся сразу после покупки.')}</p>
        </div>
        <div className={styles.noticeActions}>
          <a href="https://t.me/auroraapinew_bot" target="_blank" rel="noopener noreferrer" className="btn btn-white">
            {t('Buy plan', 'Купить тариф')}
          </a>
        </div>
      </div>

      {/* Dashboard title */}
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>
        {t('Enter your API key to see usage stats', 'Введите свой API-ключ, чтобы увидеть статистику использования')}
      </p>

      {/* API Key input */}
      <div className={styles.keyRow}>
        <input
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCheck()}
          placeholder="sk-aigateway-..."
          className={styles.keyInput}
          spellCheck={false}
        />
        <button
          onClick={handleCheck}
          disabled={checking || !apiKey.trim()}
          className={`btn btn-white ${styles.keyBtn}`}
        >
          {checking ? '...' : t('Check', 'Проверить')}
        </button>
      </div>

      {result && (
        <p className={styles.resultMsg}>{result.msg}</p>
      )}

      {/* Admin link */}
      {LITELLM_URL && (
        <div className={styles.adminRow}>
          <a href={`${LITELLM_URL}/ui`} target="_blank" rel="noopener noreferrer" className={styles.adminLink}>
            {t('LiteLLM Admin Panel', 'LiteLLM Админ-панель')} →
          </a>
        </div>
      )}
    </div>
  );
}
