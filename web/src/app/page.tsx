"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const MODELS = [
  { name: 'Claude Opus 4', provider: 'Anthropic', color: '#a78bfa' },
  { name: 'GPT-4o', provider: 'OpenAI', color: '#34d399' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', color: '#60a5fa' },
  { name: 'Llama 3.3 70B', provider: 'Meta', color: '#f472b6' },
  { name: 'Mistral Large', provider: 'Mistral AI', color: '#fbbf24' },
  { name: 'DeepSeek R2', provider: 'DeepSeek', color: '#22d3ee' },
];

const FEATURES = [
  {
    icon: '⚡',
    titleEn: 'Instant Setup',
    titleRu: 'Мгновенный старт',
    descEn: 'One API key, all models. Replace your endpoint URL and you\'re live in under 60 seconds.',
    descRu: 'Один ключ — все модели. Смени URL и работаешь менее чем за 60 секунд.',
    color: '#a78bfa',
  },
  {
    icon: '🌐',
    titleEn: 'Universal Routing',
    titleRu: 'Умный роутинг',
    descEn: 'Automatic failover, load balancing, and smart routing across 50+ AI providers.',
    descRu: 'Автоматический failover, балансировка нагрузки и роутинг по 50+ провайдерам.',
    color: '#60a5fa',
  },
  {
    icon: '📊',
    titleEn: 'Usage Analytics',
    titleRu: 'Аналитика использования',
    descEn: 'Real-time token tracking, cost breakdown per model, and detailed request logs.',
    descRu: 'Трекинг токенов в реальном времени, разбивка затрат по моделям.',
    color: '#34d399',
  },
  {
    icon: '🔐',
    titleEn: 'Secure Keys',
    titleRu: 'Безопасность',
    descEn: 'Create virtual API keys with granular spending limits and per-key access controls.',
    descRu: 'Виртуальные API-ключи с лимитами расходов и контролем доступа.',
    color: '#f472b6',
  },
  {
    icon: '💳',
    titleEn: 'Crypto Payments',
    titleRu: 'Крипто-оплата',
    descEn: 'Top-up your balance with USDT, Bitcoin, and other crypto — no bank required.',
    descRu: 'Пополняй баланс через USDT, Bitcoin и другие криптовалюты.',
    color: '#fbbf24',
  },
  {
    icon: '🔄',
    titleEn: 'OpenAI Compatible',
    titleRu: 'Совместимость с OpenAI',
    descEn: 'Works with any SDK. Drop-in replacement — no code changes needed.',
    descRu: 'Работает с любым SDK. Замена без изменения кода.',
    color: '#22d3ee',
  },
];

const STATS = [
  { valueEn: '50+', labelEn: 'AI Models', labelRu: 'AI-Моделей' },
  { valueEn: '99.9%', labelEn: 'Uptime SLA', labelRu: 'Uptime SLA' },
  { valueEn: '<50ms', labelEn: 'Avg Latency', labelRu: 'Задержка' },
  { valueEn: '24/7', labelEn: 'Support', labelRu: 'Поддержка' },
];

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeModel, setActiveModel] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveModel(i => (i + 1) % MODELS.length), 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* Ambient orbs */}
      <div className={styles.orb1} style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
      <div className={styles.orb2} style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
      <div className={styles.orb3} />

      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className="text-gradient">aigateway</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>{t('Home', 'Главная')}</Link>
            <Link href="/dashboard" className={styles.navLink}>{t('Dashboard', 'Дашборд')}</Link>
            <Link href="/dashboard/pricing" className={styles.navLink}>{t('Pricing', 'Тарифы')}</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.navLink}>{t('Login', 'Войти')}</Link>
            <Link href="/register" className="btn-primary">{t('Get Started', 'Начать')}</Link>
            <button onClick={toggleLanguage} className={styles.langBtn} aria-label="Toggle language">
              {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            {/* Badge */}
            <div className="badge badge-accent animate-fade-in-delay-1">
              <span className="badge-dot" />
              {t('Now with 50+ AI Models', 'Теперь с 50+ AI-моделями')}
            </div>

            {/* Title */}
            <h1 className={`${styles.heroTitle} animate-fade-in-delay-2`}>
              {t('The Premium', 'Профессиональный')}
              <br />
              <span className="text-gradient">{t('AI API Router', 'AI API Роутер')}</span>
            </h1>

            {/* Subtitle */}
            <p className={`${styles.heroSubtitle} animate-fade-in-delay-3`}>
              {t(
                'One key — and Claude, GPT, Gemini & more are in your app. Setup in 60 seconds.',
                'Один ключ — и Claude, GPT, Gemini и другие уже в твоём приложении. Старт за 60 секунд.'
              )}
            </p>

            {/* CTA */}
            <div className={`${styles.ctaGroup} animate-fade-in-delay-3`}>
              <Link href="/register" className="btn-primary">
                {t('Start Free →', 'Начать бесплатно →')}
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                {t('Open Dashboard', 'Открыть Dashboard')}
              </Link>
            </div>

            {/* Model Ticker */}
            <div className={styles.modelTicker}>
              <span className={styles.tickerLabel}>{t('Routing to:', 'Роутинг в:')}</span>
              <div className={styles.tickerSlot} key={activeModel}>
                <span style={{ color: MODELS[activeModel].color }}>
                  ● {MODELS[activeModel].name}
                </span>
                <span className={styles.tickerProvider}>by {MODELS[activeModel].provider}</span>
              </div>
            </div>
          </div>

          {/* Code snippet card */}
          <div className={`${styles.codeCard} glass-panel animate-fade-in-delay-3`}>
            <div className={styles.codeCardHeader}>
              <div className={styles.dot} style={{ background: '#ef4444' }} />
              <div className={styles.dot} style={{ background: '#f59e0b' }} />
              <div className={styles.dot} style={{ background: '#10b981' }} />
              <span className={styles.codeCardTitle}>terminal</span>
            </div>
            <pre className={styles.codeBlock}>
              <span className={styles.codeComment}># {t('Works with any OpenAI SDK', 'Работает с любым OpenAI SDK')}</span>{'\n'}
              <span className={styles.codeKey}>export</span> OPENAI_BASE_URL=<span className={styles.codeStr}>&quot;http://localhost:4000/v1&quot;</span>{'\n'}
              <span className={styles.codeKey}>export</span> OPENAI_API_KEY=<span className={styles.codeStr}>&quot;sk-aigateway-...&quot;</span>{'\n\n'}
              <span className={styles.codeComment}># {t('Now call any model', 'Теперь вызови любую модель')}</span>{'\n'}
              openai chat <span className={styles.codeArg}>-m claude-opus-4</span> <span className={styles.codeStr}>&quot;Hello!&quot;</span>{'\n'}
              <span className={styles.codeSuccess}>✓ Routed → Anthropic Claude Opus 4</span>
            </pre>
          </div>
        </div>

        {/* Stats bar */}
        <div className={styles.statsBar}>
          <div className="container">
            <div className={styles.statsGrid}>
              {STATS.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={`${styles.statValue} text-gradient`}>{s.valueEn}</span>
                  <span className={styles.statLabel}>{t(s.labelEn, s.labelRu)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-accent">{t('Features', 'Возможности')}</span>
            <h2 className={styles.sectionTitle}>
              {t('Everything you need,', 'Всё что нужно,')}
              <br />
              <span className="text-gradient">{t('nothing you don\'t', 'ничего лишнего')}</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              {t(
                'Built for developers who want power without complexity.',
                'Для разработчиков, которым нужна мощь без сложности.'
              )}
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`${styles.featureCard} glass-panel`}>
                <div className={styles.featureIcon} style={{ color: f.color }}>
                  {f.icon}
                </div>
                <h3 className={styles.featureTitle}>{t(f.titleEn, f.titleRu)}</h3>
                <p className={styles.featureDesc}>{t(f.descEn, f.descRu)}</p>
                <div className={styles.featureAccent} style={{ background: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={`${styles.ctaBannerInner} glass-panel`}>
            <div className={styles.ctaBannerGlow} />
            <span className="badge badge-success">
              <span className="badge-dot" />
              {t('Free to start', 'Бесплатно для старта')}
            </span>
            <h2 className={styles.ctaBannerTitle}>
              {t('Ready to scale your AI?', 'Готов масштабировать свой AI?')}
            </h2>
            <p className={styles.ctaBannerSub}>
              {t('Join developers already routing millions of requests.', 'Присоединяйся к разработчикам, маршрутизирующим миллионы запросов.')}
            </p>
            <Link href="/register" className="btn-primary">
              {t('Create free account →', 'Создать бесплатный аккаунт →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>
              <span className="text-gradient">aigateway</span>
              <span className={styles.footerTagline}>{t('The AI API Router', 'AI API Роутер')}</span>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/dashboard" className={styles.footerLink}>{t('Dashboard', 'Дашборд')}</Link>
              <Link href="/login" className={styles.footerLink}>{t('Login', 'Войти')}</Link>
              <Link href="/register" className={styles.footerLink}>{t('Register', 'Регистрация')}</Link>
            </div>
            <p className={styles.footerCopy}>© 2026 aigateway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
