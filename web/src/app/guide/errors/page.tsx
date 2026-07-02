"use client";

import Link from 'next/link';
import styles from '../guide.module.css';

export default function ErrorsPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Error Codes</h1>
        <p className={styles.subtitle}>
          Common API errors and how to fix them.
        </p>
      </div>

      <div className={styles.section}>
        <table className={styles.errorTable}>
          <thead>
            <tr>
              <th>HTTP</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>401</code></td>
              <td><code>invalid_request</code></td>
              <td>API key not provided.</td>
            </tr>
            <tr>
              <td><code>401</code></td>
              <td><code>invalid_api_key</code></td>
              <td>Key is invalid or disabled.</td>
            </tr>
            <tr>
              <td><code>429</code></td>
              <td><code>limit_exceeded</code></td>
              <td>Token limit exceeded for the current window (<code>6h</code>, <code>week</code>, <code>month</code>).</td>
            </tr>
            <tr>
              <td><code>503</code></td>
              <td><code>no_upstream_capacity</code></td>
              <td>All upstream provider keys are unavailable. Try again later.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Example error response</h2>
        <div className={styles.codeBlock}>
          <pre>{`{
  "type": "limit_exceeded",
  "message": "Token limit exceeded for 6h: 2000000/2000000",
  "window": "6h"
}`}</pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recommendations</h2>
        <ul className={styles.steps}>
          <li><span className={styles.stepNum}>401</span> Check your key or request a new one from the admin.</li>
          <li><span className={styles.stepNum}>429</span> Wait for the window to reset, upgrade your plan, or optimize requests.</li>
          <li><span className={styles.stepNum}>503</span> Temporary — keys usually recover automatically.</li>
        </ul>
      </div>

      <div className={styles.pager}>
        <Link href="/guide/javascript" className={styles.pagerLink}>← JavaScript</Link>
        <span />
      </div>
    </>
  );
}
