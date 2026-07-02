import Link from 'next/link';
import styles from './guide.module.css';

const SIDEBAR_LINKS = [
  { href: '/guide/claude-code', label: 'Claude Code' },
  { href: '/guide/cursor',      label: 'Cursor' },
  { href: '/guide/curl',        label: 'curl' },
  { href: '/guide/python',      label: 'Python' },
  { href: '/guide/javascript',  label: 'JavaScript' },
  { href: '/guide/errors',      label: 'Errors' },
];

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.nav} style={{ padding: '0 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Link href="/" className={styles.logo}>Naipigo</Link>
          <nav className={styles.navLinks}>
            <Link href="/guide/claude-code" className={styles.navLink}>Guide</Link>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </nav>
        </div>
      </header>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarLabel}>Connections</span>
            {SIDEBAR_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.sidebarLink}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
