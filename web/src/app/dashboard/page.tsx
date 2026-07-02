"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

interface KeyInfo {
  key?: string;
  key_alias?: string;
  spend?: number;
  max_budget?: number;
  models?: string[];
  token_count?: number;
  budget_duration?: string;
}

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState('');
  const [checking, setChecking] = useState(false);
  const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    const key = apiKey.trim();
    if (!key) return;
    setChecking(true);
    setKeyInfo(null);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/key/info`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data: KeyInfo = await res.json();
      setKeyInfo(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setChecking(false);
    }
  };

  const maskedKey = (k: string) =>
    k.length > 12 ? k.slice(0, 6) + '•'.repeat(8) + k.slice(-4) : k;

  const spendValue = keyInfo?.spend ?? 0;
  const budgetValue = keyInfo?.max_budget;
  const usedPercent = budgetValue && budgetValue > 0 ? Math.round((spendValue / budgetValue) * 100) : null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>Naipigo</Link>
          <div className={styles.navCenter}>
            <Link href="/guide/claude-code" className={styles.navLink}>Guide</Link>
            <Link href="/dashboard" className={`${styles.navLink} ${styles.navLinkActive}`}>Dashboard</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>
              Check your API key usage and stats.
            </p>
          </div>

          <div className={`${styles.card} ${styles.checkCard}`}>
            <div className={styles.checkCardHeader}>
              <div className={styles.checkCardTitle}>Enter your API key</div>
              <div className={styles.checkCardSub}>
                Paste the key you received to see stats.
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputPrefix}>Bearer</span>
                <input
                  type="text"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCheck()}
                  placeholder="sk-..."
                  className={styles.input}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <button
                onClick={handleCheck}
                disabled={checking || !apiKey.trim()}
                className={`btn btn-white ${styles.checkBtn}`}
              >
                {checking ? <span className={styles.spinner} /> : 'Check'}
              </button>
            </div>
          </div>

          {error && (
            <div className={`${styles.card} ${styles.resultError}`}>
              <div className={styles.errorInner}>
                <span className={styles.errorDot} />
                <span>
                  {error.includes('401') || error.includes('403')
                    ? 'Invalid or expired key.'
                    : error.includes('Failed to fetch')
                    ? 'Could not reach the API gateway. Try again later.'
                    : error}
                </span>
              </div>
            </div>
          )}

          {keyInfo && (
            <>
              <div className={styles.statsGrid}>
                <div className={`${styles.card} ${styles.statCard}`}>
                  <div className={styles.statIcon}>$</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>${spendValue.toFixed(2)}</div>
                    <div className={styles.statLabel}>Spent</div>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.statCard}`}>
                  <div className={styles.statIcon}>Σ</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>{keyInfo.token_count?.toLocaleString() || '—'}</div>
                    <div className={styles.statLabel}>Tokens</div>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.statCard}`}>
                  <div className={styles.statIcon}>#</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>{keyInfo.models?.length ?? '—'}</div>
                    <div className={styles.statLabel}>Models</div>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.statCard}`}>
                  <div className={styles.statIcon}>⌛</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>{keyInfo.budget_duration || '—'}</div>
                    <div className={styles.statLabel}>Period</div>
                  </div>
                </div>
              </div>

              {usedPercent !== null && (
                <div className={`${styles.card} ${styles.budgetCard}`}>
                  <div className={styles.budgetHeader}>
                    <span className={styles.budgetLabel}>Budget used</span>
                    <span className={styles.budgetValue}>{usedPercent}%</span>
                  </div>
                  <div className={styles.budgetBar}>
                    <div className={styles.budgetFill} style={{ width: `${Math.min(usedPercent, 100)}%` }} />
                  </div>
                </div>
              )}

              <div className={`${styles.card} ${styles.detailCard}`}>
                <div className={styles.detailTitle}>Key details</div>
                <div className={styles.detailGrid}>
                  {keyInfo.key_alias && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Alias</span>
                      <span className={styles.detailValue}>{keyInfo.key_alias}</span>
                    </div>
                  )}
                  {keyInfo.key && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Key</span>
                      <span className={styles.detailValue}>{maskedKey(keyInfo.key)}</span>
                    </div>
                  )}
                  {keyInfo.models && keyInfo.models.length > 0 && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Models</span>
                      <span className={styles.detailValue}>{keyInfo.models.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className={`${styles.card} ${styles.helpCard}`}>
            <div className={styles.helpIcon}>?</div>
            <div>
              <div className={styles.helpTitle}>Need a key?</div>
              <div className={styles.helpText}>
                Keys are issued by the service admin. Contact them to get one.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
