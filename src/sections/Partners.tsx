import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = ['TechFlow', 'GreenMart', 'MediCare', 'EduPro', 'FinTrust'];

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const logos = logosRef.current?.children;
      if (logos) {
        gsap.fromTo(
          logos,
          { y: 30, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
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
      <div className="content-container">
        <h3
          ref={titleRef}
          className="text-h3 text-center mb-12"
          style={{ color: 'var(--gray-text)', opacity: 0 }}
        >
          Нам доверяют
        </h3>
        <div
          ref={logosRef}
          className="flex flex-wrap justify-center items-center gap-12"
          style={{ maxWidth: 1000, margin: '0 auto' }}
        >
          {partners.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center px-8 py-4"
              style={{
                border: '1px solid var(--gray-border)',
                borderRadius: 'var(--border-radius-sm)',
                minWidth: 140,
                opacity: 0,
              }}
            >
              <span
                className="text-xl font-medium tracking-tight"
                style={{ color: 'var(--gray-text)' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
