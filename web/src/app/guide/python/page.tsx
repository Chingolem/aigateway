"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../guide.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

export default function PythonPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const chatExample = `import httpx

API_KEY = "sk-..."
BASE_URL = "${BASE_URL}"

payload = {
    "model": "fable-5",
    "messages": [
        {"role": "user", "content": "Write a short Python example."}
    ],
}

response = httpx.post(
    f"{BASE_URL}/v1/chat/completions",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload,
    timeout=120,
)
response.raise_for_status()
print(response.json())`;

  const modelsExample = `import httpx

response = httpx.get(
    "${BASE_URL}/v1/models",
    headers={"Authorization": "Bearer sk-..."},
)
print(response.json())`;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Python</h1>
        <p className={styles.subtitle}>
          Use the API gateway from Python with httpx or openai.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Send a message</h2>
        <div className={styles.codeBlock}>
          <pre>{chatExample}</pre>
          <button className={styles.copyBtn} onClick={() => copy(chatExample, 'chat')}>
            {copied === 'chat' ? 'Copied!' : 'Copy'}
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
          <pre>{`from openai import OpenAI

client = OpenAI(
    base_url="${BASE_URL}/v1",
    api_key="sk-...",
)

response = client.chat.completions.create(
    model="fable-5",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`}</pre>
          <button className={styles.copyBtn} onClick={() => copy(`from openai import OpenAI\n\nclient = OpenAI(\n    base_url="${BASE_URL}/v1",\n    api_key="sk-...",\n)\n\nresponse = client.chat.completions.create(\n    model="fable-5",\n    messages=[{"role": "user", "content": "Hello!"}],\n)\nprint(response.choices[0].message.content)`, 'sdk')}>
            {copied === 'sdk' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.pager}>
        <Link href="/guide/curl" className={styles.pagerLink}>← curl</Link>
        <Link href="/guide/javascript" className={styles.pagerLink}>Next: JavaScript →</Link>
      </div>
    </>
  );
}
