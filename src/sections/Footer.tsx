const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        padding: '80px var(--content-padding) 32px',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Big text */}
        <h2
          className="text-display mb-12"
          style={{
            color: 'var(--white)',
            maxWidth: '70%',
            lineHeight: 1.1,
          }}
        >
          Давайте создадим что-то классное
        </h2>

        {/* Contact email */}
        <a
          href="mailto:info@webcraft.ru"
          className="underline-button text-2xl mb-16 inline-block"
          style={{ color: 'var(--white)', borderColor: 'var(--white)' }}
        >
          info@webcraft.ru
        </a>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          <div>
            <h4
              className="mb-4"
              style={{ fontSize: 14, color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Навигация
            </h4>
            <ul className="flex flex-col gap-2">
              {['Услуги', 'Процесс', 'Кейсы', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="transition-opacity duration-300 hover:opacity-100"
                    style={{ color: 'var(--white)', opacity: 0.7 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(`#${item.toLowerCase()}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-4"
              style={{ fontSize: 14, color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Услуги
            </h4>
            <ul className="flex flex-col gap-2">
              {['Сайты', 'Мобильные приложения', 'UX/UI дизайн'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="transition-opacity duration-300 hover:opacity-100"
                    style={{ color: 'var(--white)', opacity: 0.7 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-4"
              style={{ fontSize: 14, color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Контакты
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="tel:+79990000000"
                  style={{ color: 'var(--white)', opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity duration-300"
                >
                  +7 (999) 000-00-00
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ color: 'var(--white)', opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => e.preventDefault()}
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ color: 'var(--white)', opacity: 0.7 }}
                  className="hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => e.preventDefault()}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
        >
          <span style={{ fontSize: 14, color: 'var(--gray-light)' }}>
            © 2025 WebCraft Studio
          </span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ fontSize: 14, color: 'var(--gray-light)' }}
            className="hover:text-white transition-colors duration-300"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
