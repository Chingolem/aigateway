import Link from 'next/link';
import styles from '../auth.module.css';

export default function Login() {
  return (
    <div className={styles.authPage}>
      <div className={styles.card}>
        <Link href="/" className={styles.logoArea}>aigateway</Link>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to manage your API keys</p>

        <form className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input type="email" id="email" className={styles.input} placeholder="you@example.com" required />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input type="password" id="password" className={styles.input} placeholder="••••••••" required />
          </div>
          <button type="button" className={`btn btn-white ${styles.submitBtn}`}>Sign In</button>
        </form>

        <div className={styles.divider}>or</div>

        <div className={styles.footer}>
          Don&apos;t have an account?
          <Link href="/register" className={styles.footerLink}>Create one</Link>
        </div>
      </div>
    </div>
  );
}
