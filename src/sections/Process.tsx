import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '1',
    title: 'Анализ',
    desc: 'Изучаем ваш бизнес, целевую аудиторию и конкурентов. Формируем техническое задание.',
  },
  {
    num: '2',
    title: 'Прототип и дизайн',
    desc: 'Создаём wireframes, дизайн-макеты и интерактивный прототип. Утверждаем с вами.',
  },
  {
    num: '3',
    title: 'Разработка',
    desc: 'Пишем чистый код. Frontend, backend, интеграции. Регулярные демо.',
  },
  {
    num: '4',
    title: 'Тестирование',
    desc: 'Проверяем на баги, скорость, кроссбраузерность и удобство. Исправляем до идеала.',
  },
  {
    num: '5',
    title: 'Запуск и поддержка',
    desc: 'Публикуем продукт. Обучаем вашу команду. Обеспечиваем дальнейшее развитие.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      // Timeline line animation
      gsap.fromTo(
        timelineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Steps animation
      const stepItems = stepsRef.current?.children;
      if (stepItems) {
        gsap.fromTo(
          stepItems,
          { y: 50, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding"
      style={{ backgroundColor: 'var(--black)' }}
    >
      <div className="content-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2
          ref={titleRef}
          className="text-h2 mb-3"
          style={{ color: 'var(--white)', opacity: 0 }}
        >
          Как мы работаем
        </h2>
        <p
          ref={subtitleRef}
          className="text-body mb-16"
          style={{ color: 'var(--gray-light)', opacity: 0 }}
        >
          Прозрачный процесс от идеи до запуска
        </p>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Horizontal line */}
          <div
            ref={timelineRef}
            className="absolute top-8 left-0 right-0 h-0.5"
            style={{
              backgroundColor: 'var(--accent-green)',
              transformOrigin: 'left center',
              zIndex: 1,
            }}
          />

          <div
            ref={stepsRef}
            className="relative grid grid-cols-5 gap-4"
            style={{ zIndex: 2 }}
          >
            {steps.map((step) => (
              <div key={step.num} className="text-center" style={{ opacity: 0 }}>
                {/* Circle */}
                <div
                  className="mx-auto flex items-center justify-center text-lg font-medium mb-6"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: '2px solid var(--accent-green)',
                    color: 'var(--accent-green)',
                    backgroundColor: 'var(--black)',
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-h3 mb-3"
                  style={{ color: 'var(--white)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-small px-2"
                  style={{ color: 'var(--gray-light)' }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - vertical */}
        <div className="md:hidden relative">
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: 'var(--accent-green)' }}
          />
          <div className="flex flex-col gap-10">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-6 relative">
                <div
                  className="flex-shrink-0 flex items-center justify-center text-lg font-medium"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: '2px solid var(--accent-green)',
                    color: 'var(--accent-green)',
                    backgroundColor: 'var(--black)',
                    zIndex: 2,
                  }}
                >
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3
                    className="text-h3 mb-2"
                    style={{ color: 'var(--white)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-small"
                    style={{ color: 'var(--gray-light)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
