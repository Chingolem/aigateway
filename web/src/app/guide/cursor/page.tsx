"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../guide.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

export default function CursorPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Cursor</h1>
        <p className={styles.subtitle}>
          Use the API gateway as a custom OpenAI provider in Cursor.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Setup</h2>
        <ol className={styles.steps}>
          <li><span className={styles.stepNum}>1.</span> Open Cursor settings: <code>Ctrl+Shift+J</code> (Windows/Linux) or <code>⌘+Shift+J</code> (Mac)</li>
          <li><span className={styles.stepNum}>2.</span> Go to the <strong>Models</strong> tab</li>
          <li><span className={styles.stepNum}>3.</span> Scroll to <strong>API Keys</strong> → <strong>OpenAI API Key</strong></li>
          <li><span className={styles.stepNum}>4.</span> Paste your API key (<code>sk-...</code>) in the key field</li>
          <li><span className={styles.stepNum}>5.</span> Enable <strong>Override OpenAI Base URL</strong> and set:</li>
        </ol>
        <div className={styles.codeBlock}>
          <pre>{BASE_URL}/v1</pre>
          <button className={styles.copyBtn} onClick={() => copy(`${BASE_URL}/v1`, 'url')}>
            {copied === 'url' ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionDesc}>
          <span className={styles.stepNum}>6.</span> Click <strong>Verify</strong> — Cursor will test the connection.
        </p>
        <p className={styles.sectionDesc}>
          <span className={styles.stepNum}>7.</span> In the model list at the top, enable <code>fable-5</code> (or add it manually via <strong>Add model</strong>) and disable other models so all requests go through the gateway.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.note}>
          <strong>Note.</strong> Do not share your key. Tab autocomplete may still use Cursor&apos;s built-in models — only chat requests go through the gateway.
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Troubleshooting</h2>
        <table className={styles.errorTable}>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Verify fails</td>
              <td>Check the key in the <Link href="/dashboard" className={styles.link}>Dashboard</Link> — it must be active</td>
            </tr>
            <tr>
              <td>No responses</td>
              <td>Make sure Base URL is set to <code>{BASE_URL}/v1</code> (with <code>/v1</code>)</td>
            </tr>
            <tr>
              <td>Limit reached</td>
              <td>Check token usage in the Dashboard. Limits reset periodically</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.pager}>
        <Link href="/guide/claude-code" className={styles.pagerLink}>← Claude Code</Link>
        <Link href="/guide/curl" className={styles.pagerLink}>Next: curl →</Link>
      </div>
    </>
  );
}
