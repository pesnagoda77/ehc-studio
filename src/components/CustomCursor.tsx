import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouchDevice || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        targetScaleRef.current = 1.5;
      }
    };

    const onMouseOut = () => {
      targetScaleRef.current = 1;
    };

    let rafId: number;
    const animate = () => {
      const lerp = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.15;

      cursor.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px) scale(${scaleRef.current})`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: 'var(--black)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s, height 0.3s',
        mixBlendMode: 'difference',
      }}
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
