import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Лендинг',
    price: 'от 80 000 ₽',
    period: '2-3 недели',
    popular: false,
    features: [
      'Дизайн одностраничного сайта',
      'Адаптивная вёрстка',
      'Базовая SEO-оптимизация',
      'Форма обратной связи',
      '1 месяц поддержки',
    ],
  },
  {
    name: 'Корпоративный сайт',
    price: 'от 250 000 ₽',
    period: '1-2 месяца',
    popular: true,
    features: [
      'До 10 уникальных страниц',
      'CMS-система',
      'Личный кабинет',
      'Интеграция с CRM',
      '3 месяца поддержки',
    ],
  },
  {
    name: 'Мобильное приложение',
    price: 'от 500 000 ₽',
    period: '2-4 месяца',
    popular: false,
    features: [
      'iOS или Android',
      'UI/UX дизайн',
      'Backend и API',
      'Публикация в стор',
      '6 месяцев поддержки',
    ],
  },
];

interface PricesProps {
  onOpenModal: () => void;
}

const Prices = ({ onOpenModal }: PricesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const items = gridRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <div className="content-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 ref={titleRef} className="text-h2 mb-3" style={{ opacity: 0 }}>
          Стоимость
        </h2>
        <p
          ref={subtitleRef}
          className="text-body mb-10"
          style={{ color: 'var(--gray-text)', opacity: 0 }}
        >
          Прозрачное ценообразование без скрытых платежей
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 24 }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col"
              style={{
                border: plan.popular ? '2px solid var(--accent-green)' : '1px solid var(--black)',
                padding: '40px 32px',
                backgroundColor: plan.popular ? 'rgba(212, 249, 49, 0.05)' : 'var(--white)',
                opacity: 0,
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent-green)',
                    color: 'var(--black)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  Популярный
                </div>
              )}
              <h3 className="text-h3 mb-2">{plan.name}</h3>
              <div className="mb-1" style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em' }}>
                {plan.price}
              </div>
              <div className="mb-6" style={{ fontSize: 16, color: 'var(--gray-text)' }}>
                {plan.period}
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>+</span>
                    <span className="text-small" style={{ color: 'var(--gray-text)' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onOpenModal}
                className="underline-button self-start"
              >
                Заказать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prices;
