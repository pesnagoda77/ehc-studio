import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      if (prefersReducedMotion) {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '1';
          overlayRef.current.style.display = 'flex';
        }
        if (formRef.current) {
          formRef.current.style.opacity = '1';
          formRef.current.style.transform = 'scale(1)';
        }
      } else {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'flex' });
        gsap.fromTo(
          formRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        );
      }
      
      // Focus trap - focus first input after animation
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, prefersReducedMotion ? 0 : 500);
    } else {
      document.body.style.overflow = '';
      
      if (!prefersReducedMotion) {
        gsap.to(formRef.current, { scale: 0.9, opacity: 0, duration: 0.3 });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }});
      }
    }
  }, [isOpen, prefersReducedMotion]);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    
    if (e.key !== 'Tab') return;
    
    const focusableElements = overlayRef.current?.querySelectorAll(
      'button, input, textarea, select, a[href]'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Return focus to close button
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', description: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        opacity: prefersReducedMotion ? 1 : 0,
      }}
    >
      <div
        ref={formRef}
        style={{
          backgroundColor: 'var(--white)',
          border: '1px solid var(--black)',
          padding: 48,
          maxWidth: 500,
          width: '100%',
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : 0,
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Закрыть модальное окно"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontSize: 24,
            background: 'none',
            border: 'none',
            color: 'var(--black)',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className="text-h2 mb-4">Спасибо!</h3>
            <p style={{ color: 'var(--gray-text)' }}>Мы свяжемся с вами в течение часа.</p>
          </div>
        ) : (
          <>
            <h3 id="modal-title" className="text-h2 mb-8">Оставить заявку</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="modal-name" className="sr-only">Ваше имя</label>
                <input
                  ref={firstInputRef}
                  id="modal-name"
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-black outline-none text-lg"
                  style={{ borderRadius: 0, color: 'var(--black)' }}
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="sr-only">Email</label>
                <input
                  id="modal-email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-black outline-none text-lg"
                  style={{ borderRadius: 0, color: 'var(--black)' }}
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="sr-only">Телефон</label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-black outline-none text-lg"
                  style={{ borderRadius: 0, color: 'var(--black)' }}
                />
              </div>
              <div>
                <label htmlFor="modal-description" className="sr-only">Описание проекта</label>
                <textarea
                  id="modal-description"
                  placeholder="Описание проекта"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-black outline-none text-lg resize-none"
                  style={{ borderRadius: 0, color: 'var(--black)' }}
                />
              </div>
              <button
                type="submit"
                className="self-start mt-4 px-8 py-4 text-white text-lg transition-colors duration-300"
                style={{ backgroundColor: 'var(--black)', color: 'var(--white)' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = 'var(--gray-text)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'var(--black)'; }}
                aria-label="Отправить заявку"
              >
                Отправить
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
