"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import styles from './page.module.css';

const FEATURES = [
  {
    icon: '🧠',
    en: { title: 'Powerful Models', desc: 'Claude and other top-tier models — code, text, analysis and large contexts.' },
    ru: { title: 'Сильные модели', desc: 'Claude и другие топовые нейросети — код, тексты, анализ и большие контексты.' },
  },
  {
    icon: '🔌',
    en: { title: 'Compatible API', desc: 'Standard OpenAI-compatible endpoint — works with Claude Code, Cursor, SDKs and your tools.' },
    ru: { title: 'Совместимый API', desc: 'Стандартный OpenAI-совместимый endpoint — работает с Claude Code, Cursor, SDK и привычными инструментами.' },
  },
  {
    icon: '⚡',
    en: { title: 'Streaming out of the box', desc: 'SSE streaming and tool use support — just like the original API.' },
    ru: { title: 'Стриминг из коробки', desc: 'SSE-стриминг ответов и поддержка tool use — всё как в оригинальном API.' },
  },
  {
    icon: '📊',
    en: { title: 'Transparent Limits', desc: 'Personal dashboard with stats — see how many tokens used and how many are left.' },
    ru: { title: 'Прозрачные лимиты', desc: 'Личный дашборд со статистикой — видно, сколько токенов потрачено и сколько осталось.' },
  },
  {
    icon: '🔄',
    en: { title: 'Stability', desc: 'Key pool and automatic failover — requests don\'t fail because of a single key.' },
    ru: { title: 'Стабильность', desc: 'Пул ключей и автоматическое переключение — запросы не падают из-за одного ключа.' },
  },
  {
    icon: '📣',
    en: { title: 'News & Support', desc: 'Announcements, updates and giveaways — in our Telegram channel.' },
    ru: { title: 'Новости и поддержка', desc: 'Анонсы, обновления и розыгрыши — в нашем Telegram-канале.' },
  },
];

const STEPS = [
  {
    step: '1',
    en: { title: 'Get an API key', desc: 'A key in the format sk-... is issued after purchasing a plan.' },
    ru: { title: 'Получи API-ключ', desc: 'Ключ формата sk-... выдаётся после покупки тарифа.' },
    code: 'sk-aigateway-...',
  },
  {
    step: '2',
    en: { title: 'Set environment variables', desc: 'Set OPENAI_BASE_URL and OPENAI_API_KEY — works with all OpenAI-compatible tools.' },
    ru: { title: 'Настрой окружение', desc: 'Укажи OPENAI_BASE_URL и OPENAI_API_KEY — работает со всеми OpenAI-совместимыми инструментами.' },
    code: 'OPENAI_BASE_URL=https://your-gateway/v1\nOPENAI_API_KEY=sk-aigateway-...',
  },
  {
    step: '3',
    en: { title: 'Work', desc: 'Use any model via the standard API — streaming and tool use are supported.' },
    ru: { title: 'Работай', desc: 'Используй любую модель через стандартный API — стриминг и tool use поддерживаются.' },
    code: 'openai chat -m claude-opus-4 "Hello!"',
  },
  {
    step: '4',
    en: { title: 'Track limits', desc: 'Open Dashboard, enter your key and see real-time stats.' },
    ru: { title: 'Следи за лимитами', desc: 'Открой Dashboard, введи ключ и смотри статистику в реальном времени.' },
    code: null,
    link: { href: '/dashboard', en: '→ Open Dashboard', ru: '→ Открыть Dashboard' },
  },
];

const PLANS = [
  {
    name: 'Lite',
    limits: { h6: '5M', week: '45M', month: '180M' },
  },
  {
    name: 'Plus',
    limits: { h6: '14M', week: '126M', month: '540M' },
    popular: true,
  },
  {
    name: 'Ultra',
    limits: { h6: '30M', week: '270M', month: '1.16B' },
  },
  {
    name: 'Max',
    limits: { h6: '80M', week: '720M', month: '3B' },
  },
];

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className={styles.page}>

      {/* ── Nav ── */}
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link href="/" className={styles.logo}>aigateway</Link>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>{t('Home', 'Главная')}</Link>
            <Link href="/dashboard" className={styles.navLink}>{t('Dashboard', 'Дашборд')}</Link>
          </nav>
          <div className={styles.navRight}>
            <button onClick={toggleLanguage} className={styles.langBtn}>
              {language === 'en' ? 'RU' : 'EN'}
            </button>
            <Link href="/register" className="btn btn-white">{t('Get started', 'Начать')}</Link>
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
              <Link href="/dashboard" className="btn btn-white">
                {t('Open Dashboard', 'Открыть Dashboard')}
              </Link>
              <Link href="/register" className="btn btn-outline">
                {t('Get API key', 'Получить ключ')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Why aigateway ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {t('Why aigateway', 'Почему aigateway')}
          </h2>
          <p className={styles.sectionDesc}>
            {t(
              'Minimal setup, maximum benefit — everything works through standard tools.',
              'Минимум настройки, максимум пользы — всё работает через стандартные инструменты.'
            )}
          </p>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <h4 className={styles.featureTitle}>{t(f.en.title, f.ru.title)}</h4>
                  <p className={styles.featureDesc}>{t(f.en.desc, f.ru.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── How to connect ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {t('How to connect', 'Как подключить')}
          </h2>
          <p className={styles.sectionDesc}>
            {t(
              'From key to first request — less than two minutes.',
              'От ключа до первого запроса — меньше двух минут.'
            )}
          </p>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNumber}>{s.step}</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{t(s.en.title, s.ru.title)}</h4>
                  <p className={styles.stepDesc}>{t(s.en.desc, s.ru.desc)}</p>
                  {s.code && <pre>{s.code}</pre>}
                  {s.link && (
                    <Link href={s.link.href} className={styles.stepLink}>
                      {t(s.link.en, s.link.ru)}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Pricing ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('Plans', 'Тарифы')}</h2>
          <p className={styles.sectionDesc}>
            {t(
              'All plans are valid for 30 days. Limits use sliding windows — 6 hours, week, month.',
              'Все тарифы действуют 30 дней. Лимиты считаются скользящими окнами — 6 часов, неделя, месяц.'
            )}
          </p>
          <div className={styles.plansGrid}>
            {PLANS.map((p, i) => (
              <div key={i} className={`${styles.planCard} ${p.popular ? styles.planCardPopular : ''}`}>
                {p.popular && (
                  <div className={styles.popularBadge}>{t('Popular', 'Популярный')}</div>
                )}
                <h3 className={styles.planName}>{p.name}</h3>
                <p className={styles.planDuration}>30 {t('days', 'дней')}</p>
                <ul className={styles.planLimits}>
                  <li><span>{p.limits.h6} {t('tokens', 'токенов')}</span> / {t('6 hours', '6 часов')}</li>
                  <li><span>{p.limits.week} {t('tokens', 'токенов')}</span> / {t('week', 'неделя')}</li>
                  <li><span>{p.limits.month} {t('tokens', 'токенов')}</span> / {t('month', 'месяц')}</li>
                </ul>
                <a
                  href="https://t.me/auroraapinew_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${p.popular ? 'btn-white' : 'btn-outline'} ${styles.planBtn}`}
                >
                  {t('Buy', 'Купить')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span className={styles.footerLogo}>aigateway</span>
            <div className={styles.footerLinks}>
              <Link href="/dashboard" className={styles.footerLink}>{t('Dashboard', 'Дашборд')}</Link>
              <Link href="/login" className={styles.footerLink}>{t('Login', 'Войти')}</Link>
              <Link href="/register" className={styles.footerLink}>{t('Register', 'Регистрация')}</Link>
            </div>
            <p className={styles.footerCopy}>© 2026 aigateway</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
