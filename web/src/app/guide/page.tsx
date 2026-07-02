"use client";

import Link from 'next/link';
import { useLanguage } from '../LanguageContext';
import { useState } from 'react';
import styles from './page.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

const TABS = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor',      label: 'Cursor' },
  { id: 'openai-sdk',  label: 'OpenAI SDK' },
  { id: 'curl',        label: 'cURL' },
];

export default function GuidePage() {
  const { t, language, toggleLanguage } = useLanguage();
  const [tab, setTab] = useState('claude-code');

  return (
    <div className={styles.page}>

      {/* ── Nav ── */}
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>aigateway</Link>
          <nav className={styles.navLinks}>
            <Link href="/guide" className={`${styles.navLink} ${styles.navLinkActive}`}>{t('Guide', 'Гайд')}</Link>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </nav>
          <button onClick={toggleLanguage} className={styles.langBtn}>
            {language === 'en' ? 'RU' : 'EN'}
          </button>
        </div>
      </header>

      <div className="container">
        <div className={styles.content}>

          {/* Title */}
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>{t('How to connect', 'Как подключить')}</h1>
            <p className={styles.subtitle}>
              {t(
                'Use any OpenAI-compatible client — just point it at the gateway URL with your key.',
                'Используй любой OpenAI-совместимый клиент — просто укажи URL шлюза и свой ключ.'
              )}
            </p>
          </div>

          {/* Step 1 - Get key */}
          <div className={styles.section}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>1</span>
              {t('Get your API key', 'Получи API-ключ')}
            </h2>
            <p className={styles.stepDesc}>
              {t(
                'Your key is in the format below. Keep it secret.',
                'Ключ имеет формат, показанный ниже. Храни его в безопасности.'
              )}
            </p>
            <pre className={styles.code}>sk-aigateway-xxxxxxxxxxxx</pre>
          </div>

          <hr className={styles.hr} />

          {/* Step 2 - Connect */}
          <div className={styles.section}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>2</span>
              {t('Connect your client', 'Подключи клиент')}
            </h2>

            {/* Tab bar */}
            <div className={styles.tabs}>
              {TABS.map(tb => (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={`${styles.tab} ${tab === tb.id ? styles.tabActive : ''}`}
                >
                  {tb.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'claude-code' && (
              <div className={styles.tabContent}>
                <p className={styles.stepDesc}>
                  {t(
                    'Run Claude Code with the gateway as the backend. Set these environment variables before launching:',
                    'Запусти Claude Code с шлюзом в качестве бэкенда. Установи эти переменные окружения перед запуском:'
                  )}
                </p>
                <pre className={styles.code}>{`export OPENAI_BASE_URL="${BASE_URL}/v1"
export OPENAI_API_KEY="sk-aigateway-..."

# Then run Claude Code as usual
claude`}</pre>
                <p className={styles.stepDesc}>
                  {t(
                    'Or add to your shell profile (~/.bashrc, ~/.zshrc) to persist.',
                    'Или добавь в профиль оболочки (~/.bashrc, ~/.zshrc), чтобы сохранить навсегда.'
                  )}
                </p>
              </div>
            )}

            {tab === 'cursor' && (
              <div className={styles.tabContent}>
                <p className={styles.stepDesc}>
                  {t(
                    'Open Cursor → Settings → Models. Set the following:',
                    'Открой Cursor → Настройки → Модели. Укажи следующее:'
                  )}
                </p>
                <pre className={styles.code}>{`Override OpenAI Base URL:
  ${BASE_URL}/v1

API Key:
  sk-aigateway-...`}</pre>
                <p className={styles.stepDesc}>
                  {t(
                    'Enable "OpenAI API Key" mode and disable Cursor\'s built-in model in the model list.',
                    'Включи режим "OpenAI API Key" и отключи встроенные модели Cursor в списке моделей.'
                  )}
                </p>
              </div>
            )}

            {tab === 'openai-sdk' && (
              <div className={styles.tabContent}>
                <p className={styles.stepDesc}>
                  {t('Works with any language. Example in Python:', 'Работает с любым языком. Пример на Python:')}
                </p>
                <pre className={styles.code}>{`import openai

client = openai.OpenAI(
    base_url="${BASE_URL}/v1",
    api_key="sk-aigateway-...",
)

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`}</pre>
                <p className={styles.stepDesc}>
                  {t('Node.js / TypeScript:', 'Node.js / TypeScript:')}
                </p>
                <pre className={styles.code}>{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${BASE_URL}/v1",
  apiKey: "sk-aigateway-...",
});

const res = await client.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(res.choices[0].message.content);`}</pre>
              </div>
            )}

            {tab === 'curl' && (
              <div className={styles.tabContent}>
                <p className={styles.stepDesc}>
                  {t('Direct HTTP request with curl:', 'Прямой HTTP-запрос через curl:')}
                </p>
                <pre className={styles.code}>{`curl ${BASE_URL}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-aigateway-..." \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}</pre>
              </div>
            )}
          </div>

          <hr className={styles.hr} />

          {/* Step 3 - Available models */}
          <div className={styles.section}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>3</span>
              {t('Available models', 'Доступные модели')}
            </h2>
            <p className={styles.stepDesc}>
              {t(
                'Pass any of these as the model name:',
                'Передавай любое из этих значений как имя модели:'
              )}
            </p>
            <div className={styles.modelTable}>
              {[
                { model: 'gpt-3.5-turbo', provider: 'OpenAI' },
              ].map((m, i) => (
                <div key={i} className={styles.modelRow}>
                  <code className={styles.modelName}>{m.model}</code>
                  <span className={styles.modelProvider}>{m.provider}</span>
                </div>
              ))}
            </div>
            <p className={styles.stepDesc} style={{ marginTop: '1rem' }}>
              {t(
                'Check all available models in the Dashboard after connecting.',
                'Все доступные модели видны в Dashboard после подключения.'
              )}
            </p>
          </div>

          <hr className={styles.hr} />

          {/* Step 4 - Check usage */}
          <div className={styles.section}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNum}>4</span>
              {t('Check usage', 'Следи за использованием')}
            </h2>
            <p className={styles.stepDesc}>
              {t(
                'Open the Dashboard, enter your key to see request stats and token usage.',
                'Открой Dashboard, введи ключ — и смотри статистику запросов и расход токенов.'
              )}
            </p>
            <Link href="/dashboard" className="btn btn-white" style={{ marginTop: '0.25rem', display: 'inline-flex' }}>
              {t('Go to Dashboard →', 'Открыть Dashboard →')}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
