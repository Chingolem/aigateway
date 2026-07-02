"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../guide.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_LITELLM_URL || 'http://localhost:4000';

export default function ClaudeCodePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const envBlock = `export OPENAI_BASE_URL="${BASE_URL}/v1"
export OPENAI_API_KEY="sk-..."
export OPENAI_MODEL="fable-5"`;

  const settingsBlock = `{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "OPENAI_BASE_URL": "${BASE_URL}/v1",
    "OPENAI_API_KEY": "sk-...",
    "OPENAI_MODEL": "fable-5"
  },
  "model": "fable-5"
}`;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Claude Code</h1>
        <p className={styles.subtitle}>
          Connect Claude Code to the API gateway. All requests go through your key.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Environment variables</h2>
        <p className={styles.sectionDesc}>
          Set these before launching Claude Code:
        </p>
        <div className={styles.codeBlock}>
          <pre>{envBlock}</pre>
          <button className={styles.copyBtn} onClick={() => copy(envBlock, 'env')}>
            {copied === 'env' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className={styles.sectionDesc}>
          Or add them to your shell profile (~/.bashrc, ~/.zshrc) to persist.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>settings.json example</h2>
        <p className={styles.sectionDesc}>
          Create a <code>claude_code_settings.json</code> file in your project root:
        </p>
        <div className={styles.codeBlock}>
          <pre>{settingsBlock}</pre>
          <button className={styles.copyBtn} onClick={() => copy(settingsBlock, 'settings')}>
            {copied === 'settings' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.note}>
          <strong>Keep your key safe.</strong> Do not commit it to repositories, share in screenshots, or expose in logs. If your key leaks — request a new one.
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>API Endpoints</h2>
        <p className={styles.sectionDesc}>Available endpoints (OpenAI-compatible):</p>
        <ul className={styles.steps}>
          <li><span className={styles.stepNum}>GET</span> {BASE_URL}/v1/models</li>
          <li><span className={styles.stepNum}>POST</span> {BASE_URL}/v1/chat/completions</li>
        </ul>
      </div>

      <div className={styles.pager}>
        <span />
        <Link href="/guide/cursor" className={styles.pagerLink}>Next: Cursor →</Link>
      </div>
    </>
  );
}
