import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/images/кейс-greenmart.jpg',
    name: 'GreenMart',
    category: 'Интернет-магазин',
    desc: 'Полный цикл разработки e-commerce платформы с личным кабинетом, корзиной и интеграцией платежей.',
  },
  {
    image: '/images/кейс-medicare.jpg',
    name: 'MediCare',
    category: 'Корпоративный портал',
    desc: 'Система онлайн-записи для медицинской клиники с интеграцией CRM и уведомлениями.',
  },
  {
    image: '/images/кейс-edupro.jpg',
    name: 'EduPro',
    category: 'Мобильное приложение',
    desc: 'iOS и Android приложение для онлайн-обучения с видеоуроками и прогрессом.',
  },
  {
    image: '/images/кейс-fintrust.jpg',
    name: 'FinTrust',
    category: 'Финтех-сайт',
    desc: 'Корпоративный сайт финансовой компании с калькуляторами и личным кабинетом.',
  },
];

const CaseCard = ({ caseItem }: { caseItem: typeof cases[0] }) => {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        border: '1px solid var(--black)',
        backgroundColor: 'var(--white)',
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={caseItem.image}
          alt={caseItem.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: 'scale(1)' }}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <span className="underline-button" style={{ color: 'var(--white)', borderColor: 'var(--white)' }}>
            Смотреть кейс
          </span>
        </div>
      </div>

      {/* Text content */}
      <div style={{ padding: 24 }}>
        <span
          className="block mb-2"
          style={{ fontSize: 14, color: 'var(--gray-text)' }}
        >
          {caseItem.category}
        </span>
        <h3 className="text-h3 mb-2">{caseItem.name}</h3>
        <p className="text-small" style={{ color: 'var(--gray-text)' }}>
          {caseItem.desc}
        </p>
      </div>
    </div>
  );
};

const Cases = () => {
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
          { y: 60, opacity: 0 },
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
      id="cases"
      className="section-padding"
      style={{ backgroundColor: 'var(--gray-bg)' }}
    >
      <div className="content-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 ref={titleRef} className="text-h2 mb-3" style={{ opacity: 0 }}>
          Наши работы
        </h2>
        <p
          ref={subtitleRef}
          className="text-body mb-10"
          style={{ color: 'var(--gray-text)', opacity: 0 }}
        >
          Реальные проекты для реальных бизнесов
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 24 }}
        >
          {cases.map((c) => (
            <CaseCard key={c.name} caseItem={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
