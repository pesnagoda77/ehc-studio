import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Modal from './components/Modal';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Process from './sections/Process';
import WhyUs from './sections/WhyUs';
import Cases from './sections/Cases';
import Prices from './sections/Prices';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Header onOpenModal={() => setModalOpen(true)} />

      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <Services />
        <Process />
        <WhyUs />
        <Cases />
        <Prices onOpenModal={() => setModalOpen(true)} />
        <FAQ />
        <CTA onOpenModal={() => setModalOpen(true)} />
      </main>

      <Footer />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed transition-all duration-300 z-50"
        style={{
          bottom: 32,
          right: 32,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'var(--black)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          border: 'none',
        }}
        data-cursor-hover
        aria-label="Наверх"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
