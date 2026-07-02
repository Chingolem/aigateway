"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import styles from './page.module.css';

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className={styles.page}>

      {/* ── Nav ── */}
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>aigateway</Link>
          <nav className={styles.navLinks}>
            <Link href="/guide" className={styles.navLink}>{t('Guide', 'Гайд')}</Link>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </nav>
          <div className={styles.navRight}>
            <button onClick={toggleLanguage} className={styles.langBtn}>
              {language === 'en' ? 'RU' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <h1 className={`${styles.heroTitle} fade-up`}>
              aigateway
              <span className={styles.heroSub}>
                {t('AI API Router', 'API для нейросетей')}
              </span>
            </h1>
            <p className={`${styles.heroDesc} fade-up delay-1`}>
              {t(
                'One key — and Claude along with other models are in your terminal. Setup in minutes.',
                'Один ключ — и Claude с другими моделями уже в твоём терминале. Подключение за пару минут.'
              )}
            </p>
            <div className={`${styles.heroBtns} fade-up delay-2`}>
              <Link href="/guide" className="btn btn-white">
                {t('How to connect', 'Как подключить')}
              </Link>
              <Link href="/dashboard" className="btn btn-outline">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span className={styles.footerLogo}>aigateway</span>
            <div className={styles.footerLinks}>
              <Link href="/guide" className={styles.footerLink}>{t('Guide', 'Гайд')}</Link>
              <Link href="/dashboard" className={styles.footerLink}>Dashboard</Link>
            </div>
            <p className={styles.footerCopy}>© 2026 aigateway</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
