import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  onOpenModal: () => void;
}

const CTA = ({ onOpenModal }: CTAProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      [titleRef, subtitleRef, btnRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.opacity = '1';
        }
      });
      return;
    }

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
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: 'var(--accent-green)',
        padding: '120px var(--content-padding)',
      }}
    >
      <div style={{ maxWidth: 800 }}>
        <h2
          ref={titleRef}
          className="text-h1 mb-6"
          style={{ color: 'var(--black)', opacity: prefersReducedMotion ? 1 : 0 }}
        >
          Готовы обсудить ваш проект?
        </h2>
        <p
          ref={subtitleRef}
          className="text-body mb-10"
          style={{ color: 'var(--gray-text)', opacity: prefersReducedMotion ? 1 : 0 }}
        >
          Оставьте заявку — мы свяжемся в течение часа и бесплатно проконсультируем
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            ref={btnRef}
            onClick={onOpenModal}
            className="underline-button"
            style={{
              opacity: prefersReducedMotion ? 1 : 0,
              borderColor: 'var(--black)',
            }}
            aria-label="Оставить заявку на разработку"
          >
            Оставить заявку
          </button>
          <a
            href="tel:+79999999999"
            className="underline-button"
            style={{
              borderColor: 'var(--black)',
              color: 'var(--black)',
            }}
            aria-label="Позвонить нам"
          >
            Позвонить
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
