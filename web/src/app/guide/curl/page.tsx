"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../guide.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

export default function CurlPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const modelsCmd = `curl ${BASE_URL}/v1/models \\
  -H "Authorization: Bearer $API_KEY"`;

  const chatCmd = `curl ${BASE_URL}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "model": "fable-5",
    "messages": [
      {"role": "user", "content": "Explain what an API is in one sentence."}
    ]
  }'`;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>curl</h1>
        <p className={styles.subtitle}>
          Test the API directly from the terminal.
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionDesc}>
          Replace <code>$API_KEY</code> with your actual key.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>List models</h2>
        <div className={styles.codeBlock}>
          <pre>{modelsCmd}</pre>
          <button className={styles.copyBtn} onClick={() => copy(modelsCmd, 'models')}>
            {copied === 'models' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Send a message</h2>
        <div className={styles.codeBlock}>
          <pre>{chatCmd}</pre>
          <button className={styles.copyBtn} onClick={() => copy(chatCmd, 'chat')}>
            {copied === 'chat' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Using x-api-key header</h2>
        <p className={styles.sectionDesc}>You can also pass the key via the <code>x-api-key</code> header instead of Bearer:</p>
        <div className={styles.codeBlock}>
          <pre>{`curl ${BASE_URL}/v1/models \\
  -H "x-api-key: $API_KEY"`}</pre>
          <button className={styles.copyBtn} onClick={() => copy(`curl ${BASE_URL}/v1/models \\\n  -H "x-api-key: $API_KEY"`, 'xkey')}>
            {copied === 'xkey' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.pager}>
        <Link href="/guide/cursor" className={styles.pagerLink}>← Cursor</Link>
        <Link href="/guide/python" className={styles.pagerLink}>Next: Python →</Link>
      </div>
    </>
  );
}
