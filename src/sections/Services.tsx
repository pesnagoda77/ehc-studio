import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Создание сайтов',
    desc: 'Разработаем современный сайт для вашего бизнеса — от лендинга до сложного корпоративного портала. Адаптивный дизайн, быстрая загрузка, удобная админка.',
  },
  {
    num: '02',
    title: 'Переделка сайтов',
    desc: 'Обновим устаревший сайт: новый дизайн, современные технологии, улучшение скорости и SEO. Сохраним всё ценное, добавим новое.',
  },
  {
    num: '03',
    title: 'Мобильные приложения iOS',
    desc: 'Создадим нативное приложение для iPhone и iPad. Публикация в App Store, поддержка и обновления.',
  },
  {
    num: '04',
    title: 'Мобильные приложения Android',
    desc: 'Разработаем Android-приложение для любых задач. Публикация в Google Play, оптимизация под все устройства.',
  },
  {
    num: '05',
    title: 'UX/UI дизайн',
    desc: 'Спроектируем удобный и красивый интерфейс. Исследования, прототипы, анимации, дизайн-система.',
  },
  {
    num: '06',
    title: 'Поддержка и развитие',
    desc: 'Обеспечим бесперебойную работу вашего продукта. Хостинг, обновления, мониторинг, техническая поддержка 24/7.',
  },
];

const ServiceBlock = ({ service }: { service: typeof services[0] }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (badgeRef.current) {
      badgeRef.current.style.left = `${x}px`;
      badgeRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = () => {
    if (badgeRef.current) {
      badgeRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (badgeRef.current) {
      badgeRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={blockRef}
      className="relative group"
      style={{
        border: '1px solid var(--black)',
        padding: 32,
        minHeight: 280,
        backgroundColor: 'var(--white)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <span
        className="block mb-4"
        style={{ fontSize: 14, color: 'var(--gray-text)', fontWeight: 400 }}
      >
        {service.num}
      </span>
      <h3 className="text-h3 mb-4">{service.title}</h3>
      <p className="text-small" style={{ color: 'var(--gray-text)' }}>
        {service.desc}
      </p>

      {/* Hover badge - desktop only */}
      <div
        ref={badgeRef}
        className="pointer-events-none hidden md:flex items-center justify-center text-white text-sm font-medium transition-opacity duration-300"
        style={{
          position: 'absolute',
          width: 104,
          height: 104,
          borderRadius: '50%',
          backgroundColor: 'var(--black)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 10,
        }}
      >
        Подробнее
      </div>
      
      {/* Touch feedback */}
      <div 
        className="absolute inset-0 md:hidden opacity-0 active:opacity-10 transition-opacity"
        style={{ backgroundColor: 'var(--black)' }}
      />
    </div>
  );
};

const Services = () => {
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
            duration: 0.6,
            stagger: 0.1,
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
      id="services"
      className="section-padding"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <div className="content-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 ref={titleRef} className="text-h2 mb-3" style={{ opacity: 0 }}>
          Наши услуги
        </h2>
        <p
          ref={subtitleRef}
          className="text-body mb-10"
          style={{ color: 'var(--gray-text)', opacity: 0 }}
        >
          Комплексные решения для вашего бизнеса
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'var(--grid-gap)' }}
        >
          {services.map((s) => (
            <ServiceBlock key={s.num} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
