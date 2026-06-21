import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Сколько времени занимает разработка сайта?',
    a: 'Сроки зависят от сложности проекта. Простой лендинг — 2-3 недели, корпоративный сайт — 1-2 месяца, сложный портал — от 3 месяцев. Мы всегда фиксируем сроки в договоре.',
  },
  {
    q: 'Как формируется стоимость?',
    a: 'Цена определяется объёмом работ, сложностью дизайна и функциональностью. После обсуждения проекта мы готовим детальную смету. Никаких скрытых платежей — всё прозрачно.',
  },
  {
    q: 'Можно ли переделать существующий сайт?',
    a: 'Конечно. Мы анализируем текущий сайт, предлагаем план обновления и реализуем его. Можно обновить только дизайн или полностью переписать код.',
  },
  {
    q: 'Делаете ли вы мобильные приложения?',
    a: 'Да, мы разрабатываем нативные приложения для iOS и Android, а также кроссплатформенные решения. Помогаем с публикацией в App Store и Google Play.',
  },
  {
    q: 'Что входит в поддержку после запуска?',
    a: 'Исправление багов, обновление контента, техническая поддержка, мониторинг работоспособности. Период поддержки зависит от выбранного тарифа.',
  },
  {
    q: 'Как начать с вами работать?',
    a: 'Оставьте заявку на сайте или напишите нам в Telegram. Мы свяжемся с вами в течение часа, обсудим проект и подготовим коммерческое предложение.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current && contentRef.current) {
      if (isOpen) {
        const height = contentRef.current.scrollHeight;
        answerRef.current.style.maxHeight = `${height}px`;
      } else {
        answerRef.current.style.maxHeight = '0px';
      }
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: '1px solid var(--black)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: '24px 32px' }}
        data-cursor-hover
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'var(--black)',
            paddingRight: 16,
          }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: 'var(--black)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </span>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{
          maxHeight: 0,
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef} style={{ padding: '0 32px 24px' }}>
          <p className="text-small" style={{ color: 'var(--gray-text)' }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      const items = listRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
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
      id="faq"
      className="section-padding"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2
          ref={titleRef}
          className="text-h2 text-center mb-10"
          style={{ opacity: 0 }}
        >
          Частые вопросы
        </h2>
        <div ref={listRef}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ opacity: 0, borderTop: i === 0 ? '1px solid var(--black)' : 'none' }}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
