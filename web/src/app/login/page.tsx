import Link from 'next/link';
import styles from '../auth.module.css';

export default function Login() {
  return (
    <div className={styles.authPage}>
      <div className={`${styles.card} glass-panel animate-fade-in`}>
        <div className={styles.cardInner}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <Link href="/" className={styles.logoArea}>
              <span className={styles.logoIcon}>✦</span>
              <span className="text-gradient">aigateway</span>
            </Link>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to manage your AI APIs</p>
          </div>

          {/* Form */}
          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉</span>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="button" className={`btn-primary ${styles.submitBtn}`}>
              Sign In →
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <div className={styles.footer}>
            Don&apos;t have an account?
            <Link href="/register" className={styles.footerLink}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
