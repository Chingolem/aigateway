import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>Naipigo</Link>
          <nav className={styles.navLinks}>
            <Link href="/guide/claude-code" className={styles.navLink}>Guide</Link>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <h1 className={`${styles.heroTitle} fade-up`}>
              Naipigo
            </h1>
            <p className={`${styles.heroDesc} fade-up delay-1`}>
              One API key for fable-5. Connect any OpenAI-compatible client — setup in minutes.
            </p>
            <div className={`${styles.heroBtns} fade-up delay-2`}>
              <Link href="/guide/claude-code" className="btn btn-white">
                How to connect
              </Link>
              <Link href="/dashboard" className="btn btn-outline">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span className={styles.footerLogo}>Naipigo</span>
            <div className={styles.footerLinks}>
              <Link href="/guide/claude-code" className={styles.footerLink}>Guide</Link>
              <Link href="/dashboard" className={styles.footerLink}>Dashboard</Link>
            </div>
            <p className={styles.footerCopy}>© 2026 Naipigo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
