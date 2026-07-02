"use client";

import Link from 'next/link';
import { useLanguage } from '../LanguageContext';
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>aigateway</Link>
          <div className={styles.navRight}>
            <Link href="/" className={styles.navLink}>{t('Home', 'Главная')}</Link>
            <button onClick={toggleLanguage} className={styles.langBtn}>
              {language === 'en' ? 'RU' : 'EN'}
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
