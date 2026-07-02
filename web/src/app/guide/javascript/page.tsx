"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../guide.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

export default function JavaScriptPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const fetchExample = `const API_KEY = "sk-...";
const BASE_URL = "${BASE_URL}";

const response = await fetch(\`\${BASE_URL}/v1/chat/completions\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "fable-5",
    messages: [
      { role: "user", content: "Explain REST API in one phrase." },
    ],
  }),
});

const data = await response.json();
console.log(data);`;

  const modelsExample = `const response = await fetch(\`${BASE_URL}/v1/models\`, {
  headers: { Authorization: \`Bearer \${API_KEY}\` },
});
console.log(await response.json());`;

  const sdkExample = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${BASE_URL}/v1",
  apiKey: "sk-...",
});

const res = await client.chat.completions.create({
  model: "fable-5",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(res.choices[0].message.content);`;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>JavaScript / TypeScript</h1>
        <p className={styles.subtitle}>
          Use the API from Node.js or the browser.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>fetch (Node.js 18+ / browser)</h2>
        <div className={styles.codeBlock}>
          <pre>{fetchExample}</pre>
          <button className={styles.copyBtn} onClick={() => copy(fetchExample, 'fetch')}>
            {copied === 'fetch' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>List models</h2>
        <div className={styles.codeBlock}>
          <pre>{modelsExample}</pre>
          <button className={styles.copyBtn} onClick={() => copy(modelsExample, 'models')}>
            {copied === 'models' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Using OpenAI SDK</h2>
        <div className={styles.codeBlock}>
          <pre>{sdkExample}</pre>
          <button className={styles.copyBtn} onClick={() => copy(sdkExample, 'sdk')}>
            {copied === 'sdk' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.pager}>
        <Link href="/guide/python" className={styles.pagerLink}>← Python</Link>
        <Link href="/guide/errors" className={styles.pagerLink}>Next: Errors →</Link>
      </div>
    </>
  );
}
