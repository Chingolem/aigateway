import Link from 'next/link';
import styles from '../auth.module.css';

export default function Register() {
  return (
    <div className={styles.authPage}>
      <div className={styles.card}>
        <Link href="/" className={styles.logoArea}>aigateway</Link>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Start using AI APIs in seconds</p>

        <form className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input type="text" id="name" className={styles.input} placeholder="John Doe" required />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input type="email" id="email" className={styles.input} placeholder="you@example.com" required />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input type="password" id="password" className={styles.input} placeholder="••••••••" required />
          </div>
          <button type="button" className={`btn btn-white ${styles.submitBtn}`}>Create Account</button>
        </form>

        <div className={styles.divider}>or</div>

        <div className={styles.footer}>
          Already have an account?
          <Link href="/login" className={styles.footerLink}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
