import Link from 'next/link';
import styles from '../auth.module.css';

export default function Register() {
  return (
    <div className={styles.authPage}>
      <div className={`${styles.card} glass-panel animate-fade-in`}>
        <div className={styles.cardInner}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <Link href="/" className={styles.logoArea}>
              <span className={styles.logoIcon}>✦</span>
              <span className="text-gradient">Aurora</span>
              <span className={styles.logoSub}>AI</span>
            </Link>
            <h1 className={styles.title}>Create account</h1>
            <p className={styles.subtitle}>Start routing AI requests in seconds</p>
          </div>

          {/* Form */}
          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">Full Name</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  id="name"
                  className={styles.input}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="button" className={`btn-primary ${styles.submitBtn}`}>
              Create Account →
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <div className={styles.footer}>
            Already have an account?
            <Link href="/login" className={styles.footerLink}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
