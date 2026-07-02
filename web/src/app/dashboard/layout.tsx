"use client";

import Link from 'next/link';
import { useLanguage } from '../LanguageContext';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';

const NAV_ITEMS = [
  { href: '/dashboard', iconEn: '⚡', labelEn: 'API Check', labelRu: 'Проверка API' },
  { href: '/dashboard/pricing', iconEn: '💎', labelEn: 'Pricing', labelRu: 'Тарифы' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      {/* Ambient background */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className="text-gradient">aigateway</span>
          </Link>

          <nav className={styles.sideNav}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.sideNavItem} ${isActive ? styles.sideNavItemActive : ''}`}
                >
                  <span className={styles.sideNavIcon}>{item.iconEn}</span>
                  <span>{t(item.labelEn, item.labelRu)}</span>
                  {isActive && <span className={styles.activeIndicator} />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.backLink}>
            ← {t('Back to site', 'На сайт')}
          </Link>
          <button onClick={toggleLanguage} className={styles.langBtn}>
            {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <div className={`badge badge-success`}>
              <span className="badge-dot" />
              {t('Gateway Online', 'Шлюз работает')}
            </div>
          </div>
          <div className={styles.topbarRight}>
            <Link href="/login" className={styles.topbarLink}>{t('Login', 'Войти')}</Link>
            <Link href="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
              {t('Register', 'Регистрация')}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
