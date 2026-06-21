import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  onOpenModal: () => void;
}

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Процесс', href: '#process' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'FAQ', href: '#faq' },
];

const Header = ({ onOpenModal }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (menuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        });
      }
    }
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--white)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--black)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between h-20" style={{ padding: '0 var(--content-padding)' }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-semibold text-xl tracking-tight"
          style={{ color: 'var(--black)' }}
        >
          WebCraft
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="transition-opacity duration-300 hover:opacity-100"
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.5,
                opacity: 0.6,
                color: 'var(--black)',
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenModal}
            className="underline-button"
          >
            Оставить заявку
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-xl font-medium"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: 'var(--black)' }}
        >
          {menuOpen ? 'Закрыть' : 'Меню'}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, backgroundColor: 'var(--white)', borderBottom: '1px solid var(--black)' }}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-lg py-2"
              style={{ color: 'var(--black)' }}
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onOpenModal(); }} className="underline-button self-start">
            Оставить заявку
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
