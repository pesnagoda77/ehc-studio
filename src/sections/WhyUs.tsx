import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    num: '10+',
    title: 'Лет опыта',
    text: 'Более десяти лет создаём цифровые продукты. Знаем, что работает, а что нет.',
  },
  {
    num: '25+',
    title: 'Специалистов',
    text: 'Разработчики, дизайнеры, тестировщики и менеджеры. Полный цикл разработки в одной команде.',
  },
  {
    num: '150+',
    title: 'Выполненных проектов',
    text: 'От небольших лендингов до сложных корпоративных систем. Разные отрасли и задачи.',
  },
  {
    num: '100%',
    title: 'Соблюдение сроков',
    text: 'Чёткое планирование и прозрачный процесс. Сдаём вовремя или раньше.',
  },
  {
    num: '→',
    title: 'Честные цены',
    text: 'Фиксированная стоимость по договору. Никаких скрытых платежей и дополнительных счетов.',
  },
  {
    num: '∞',
    title: 'Постоянная связь',
    text: 'Личный менеджер на всех этапах. Отвечаем на вопросы в течение часа.',
  },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

      const items = gridRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2,
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
      <div className="content-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 ref={titleRef} className="text-h2 mb-10" style={{ opacity: 0 }}>
          Почему выбирают нас
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'var(--grid-gap)' }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="group transition-colors duration-300"
              style={{
                border: '1px solid var(--black)',
                padding: 32,
                minHeight: 320,
                backgroundColor: 'var(--white)',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'var(--black)';
                el.querySelector('.num-el')?.setAttribute('style', 'color: var(--white); font-size: 80px; font-weight: 500; line-height: 1; margin-bottom: 16px; transition: color 0.3s;');
                el.querySelector('.title-el')?.setAttribute('style', 'font-size: clamp(20px, 2.5vw, 24px); font-weight: 500; line-height: 1.25; letter-spacing: -0.02em; margin-bottom: 12px; color: var(--white); transition: color 0.3s;');
                el.querySelector('.text-el')?.setAttribute('style', 'font-size: 18px; font-weight: 400; line-height: 1.5; color: var(--gray-light); transition: color 0.3s;');
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'var(--white)';
                el.querySelector('.num-el')?.setAttribute('style', 'color: var(--black); font-size: 80px; font-weight: 500; line-height: 1; margin-bottom: 16px; transition: color 0.3s;');
                el.querySelector('.title-el')?.setAttribute('style', 'font-size: clamp(20px, 2.5vw, 24px); font-weight: 500; line-height: 1.25; letter-spacing: -0.02em; margin-bottom: 12px; color: var(--black); transition: color 0.3s;');
                el.querySelector('.text-el')?.setAttribute('style', 'font-size: 18px; font-weight: 400; line-height: 1.5; color: var(--gray-text); transition: color 0.3s;');
              }}
            >
              <div
                className="num-el"
                style={{
                  fontSize: 80,
                  fontWeight: 500,
                  lineHeight: 1,
                  marginBottom: 16,
                  color: 'var(--black)',
                  transition: 'color 0.3s',
                }}
              >
                {card.num}
              </div>
              <h3
                className="title-el"
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 24px)',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                  color: 'var(--black)',
                  transition: 'color 0.3s',
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-el"
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--gray-text)',
                  transition: 'color 0.3s',
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
