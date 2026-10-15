import { useEffect, useRef, useState } from "react";

const photos = {
  hero: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=1600&q=90",
  detail: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=1200&q=85",
  soft: "https://images.unsplash.com/photo-1641814250010-9887d86eedfd?auto=format&fit=crop&w=1200&q=85",
  french: "https://images.unsplash.com/photo-1599206676335-193c82b13c9e?auto=format&fit=crop&w=1200&q=85",
  salon: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1400&q=85",
  pink: "https://images.unsplash.com/photo-1643648854897-7b5845b4c04c?auto=format&fit=crop&w=1000&q=85",
  jewelry: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=1000&q=85",
};

const carouselExamples = [
  { photo: photos.detail, name: "Rosé glow", style: "tons suaves" },
  { photo: photos.soft, name: "Soft touch", style: "natural" },
  { photo: photos.pink, name: "Pink mood", style: "rosa intenso" },
  { photo: photos.jewelry, name: "Pearl detail", style: "detalhes delicados" },
  { photo: photos.french, name: "French glow", style: "francesinha" },
  { photo: photos.salon, name: "Studio ritual", style: "cuidado completo" },
  { photo: photos.hero, name: "Everyday shine", style: "clássico" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const services = [
  {
    number: "01",
    name: "Nail art autoral",
    text: "Criações exclusivas que traduzem sua personalidade em cada detalhe.",
  },
  {
    number: "02",
    name: "Gel & extensão",
    text: "Estrutura leve, resistente e com acabamento impecavelmente natural.",
  },
  {
    number: "03",
    name: "Spa manicure",
    text: "Um ritual completo de cuidado, hidratação e bem-estar para suas mãos.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dragStart = useRef<number | null>(null);
  const rotationStart = useRef(0);
  const rotationStep = 360 / carouselExamples.length;
  const activeExampleIndex =
    ((Math.round(-rotation / rotationStep) % carouselExamples.length) + carouselExamples.length) %
    carouselExamples.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHeroMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--rx", `${y * -7}deg`);
    event.currentTarget.style.setProperty("--ry", `${x * 9}deg`);
    event.currentTarget.style.setProperty("--mx", `${50 + x * 26}%`);
    event.currentTarget.style.setProperty("--my", `${50 + y * 26}%`);
  };

  const resetHeroMove = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "50%");
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    rotationStart.current = rotation;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setRotation(rotationStart.current + (event.clientX - dragStart.current) * 0.35);
  };

  const stopDrag = () => {
    dragStart.current = null;
  };

  return (
    <main>
      <div className="progress-rail" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Soft Chaos por Eduarda — início">
          SOFT CHAOS<span>Eduarda · nail artist</span>
        </a>

        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Navegação principal">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            Sobre
          </a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>
            Serviços
          </a>
          <a href="#trabalhos" onClick={() => setMenuOpen(false)}>
            Trabalhos
          </a>
        </nav>

        <a className="header-cta" href="#agendar">
          Fale com a Eduarda
          <Arrow diagonal />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Nail art · beleza fora do óbvio</p>
          <h1>
            UNHAS COM
            <span>um toque de caos.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Nail art autoral por Eduarda — feita para combinar com o seu
              jeito, até nos dias meio caóticos.
            </p>
            <a className="circle-link" href="#trabalhos" aria-label="Ver trabalhos">
              <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="hero-visual" onPointerMove={handleHeroMove} onPointerLeave={resetHeroMove}>
          <div className="aurora" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-image-wrap">
            <img src={photos.hero} alt="Mãos com manicure rosa delicada" />
          </div>
          <div className="floating-note">
            <span>feito com</span>
            carinho & caos
          </div>
          <div className="spark spark--one">✦</div>
          <div className="spark spark--two">✦</div>
        </div>

        <div className="scroll-note">
          <span />
          descubra
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>SOFT CHAOS</span><b>✦</b><span>NAIL ART AUTORAL</span><b>✦</b>
          <span>BELEZA DO SEU JEITO</span><b>✦</b><span>SOFT CHAOS</span><b>✦</b>
          <span>NAIL ART AUTORAL</span><b>✦</b><span>BELEZA DO SEU JEITO</span><b>✦</b>
        </div>
      </div>

      <section className="nailverse section-pad" aria-label="Experiência 360 graus">
        <div className="nailverse-heading reveal">
          <p className="eyebrow">Nailverse · experiência interativa</p>
          <h2>
            Veja cada detalhe em <em>360°</em>
          </h2>
          <p>Arraste para explorar referências de nail art por todos os ângulos.</p>
        </div>

        <div
          className="carousel-scene reveal"
          role="group"
          aria-roledescription="carrossel 3D"
          aria-label={`Carrossel 3D com ${carouselExamples.length} referências de nail art`}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          <div className="carousel-glow" />
          <div
            className="carousel-3d"
            style={{ transform: `rotateX(-8deg) rotateY(${rotation}deg)` }}
          >
            {carouselExamples.map((example, index) => (
              <figure
                className="orbit-card"
                key={example.name}
                style={{ transform: `rotateY(${index * rotationStep}deg) translateZ(var(--orbit-radius))` }}
              >
                <img
                  src={example.photo}
                  alt={`${example.name}, referência ilustrativa de nail art em ${example.style}`}
                  draggable="false"
                />
                <figcaption>
                  <span>{example.name}</span>
                  <small>{example.style}</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="drag-hint" aria-hidden="true">
            <span>←</span> arraste para girar <span>→</span>
          </div>
        </div>

        <div className="carousel-controls">
          <button type="button" onClick={() => setRotation(rotation + rotationStep)} aria-label="Criação anterior">
            ←
          </button>
          <span aria-live="polite">
            {String(activeExampleIndex + 1).padStart(2, "0")} / {String(carouselExamples.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => setRotation(rotation - rotationStep)} aria-label="Próxima criação">
            →
          </button>
        </div>
      </section>

      <section className="about section-pad" id="sobre">
        <div className="about-number reveal">
          <span>01</span>
          <p>Quem faz acontecer</p>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">Um pouco sobre mim</p>
          <h2>
            Um pouco de cor no meio da <em>bagunça.</em>
          </h2>
          <p className="body-copy">
            Eu sou a Eduarda, designer de unhas. Gosto de criar combinações
            com personalidade, misturando delicadeza, cor e aquele detalhe
            inesperado que deixa tudo com a sua cara.
          </p>
          <div className="signature">Eduarda</div>
        </div>
        <div className="about-art reveal">
          <img src={photos.detail} alt="Nail art em tons de rosa" />
          <div className="rotating-stamp">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <defs>
                <path id="stampPath" d="M80,80 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0" />
              </defs>
              <text>
                <textPath href="#stampPath">CRIATIVIDADE • CUIDADO • EXPRESSÃO • </textPath>
              </text>
            </svg>
            <span>✦</span>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">O que dá pra criar</p>
            <h2>Meu trabalho</h2>
          </div>
          <p>Um cuidado feito com calma, atenção e espaço para a sua personalidade.</p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-row reveal" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
              <a href="#agendar" aria-label={`Agendar ${service.name}`}>
                <Arrow diagonal />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="trabalhos">
        <div className="work-title reveal">
          <p className="eyebrow">Inspirações</p>
          <h2>
            Feitas para <em>inspirar.</em>
          </h2>
        </div>
        <div className="gallery">
          <figure className="gallery-card gallery-card--tall reveal">
            <img src={photos.soft} alt="Referência ilustrativa de manicure em tom natural" />
            <figcaption><span>Rosé dream</span><small>Referência ilustrativa</small></figcaption>
          </figure>
          <figure className="gallery-card gallery-card--wide reveal">
            <img src={photos.salon} alt="Referência ilustrativa de atendimento de manicure" />
            <figcaption><span>Studio ritual</span><small>Referência ilustrativa</small></figcaption>
          </figure>
          <figure className="gallery-card reveal">
            <img src={photos.french} alt="Referência ilustrativa de unhas francesinhas" />
            <figcaption><span>French glow</span><small>Referência ilustrativa</small></figcaption>
          </figure>
          <figure className="gallery-card reveal">
            <img src={photos.pink} alt="Referência ilustrativa de nail art em rosa vibrante" />
            <figcaption><span>Pink mood</span><small>Referência ilustrativa</small></figcaption>
          </figure>
          <figure className="gallery-card reveal">
            <img src={photos.jewelry} alt="Referência ilustrativa de unhas com detalhes delicados" />
            <figcaption><span>Pearl detail</span><small>Referência ilustrativa</small></figcaption>
          </figure>
          <figure className="gallery-card reveal">
            <img src={photos.detail} alt="Referência ilustrativa de manicure em tons rosados" />
            <figcaption><span>Rosé glow</span><small>Referência ilustrativa</small></figcaption>
          </figure>
        </div>
        <a className="text-link reveal" href="#agendar">
          Fale com a Eduarda <Arrow />
        </a>
      </section>

      <section className="testimonial">
        <div className="testimonial-image reveal">
          <img src={photos.hero} alt="" />
        </div>
        <div className="testimonial-copy reveal">
          <span className="quote-mark">“</span>
          <blockquote>
            Soft Chaos é beleza sem roteiro: unhas com espaço para cor,
            expressão e um pouco de caos.
          </blockquote>
          <p>Eduarda · designer de unhas</p>
        </div>
      </section>

      <section className="booking section-pad" id="agendar">
        <div className="booking-star" aria-hidden="true">✦</div>
        <p className="eyebrow reveal">Seu próximo desenho começa aqui</p>
        <h2 className="reveal">
          Bora criar algo <em>com a sua cara?</em>
        </h2>
        <a
          className="booking-button reveal"
          href="#contato"
        >
          Quero falar com a Eduarda <Arrow diagonal />
        </a>
      </section>

      <footer>
        <a className="brand brand--footer" href="#inicio">
          SOFT CHAOS<span>Eduarda · nail artist</span>
        </a>
        <div id="contato">
          <p>Designer de unhas</p>
          <p>Eduarda</p>
        </div>
        <div className="footer-links">
          <a href="#inicio">Voltar ao início</a>
        </div>
        <p className="copyright">© 2026 Soft Chaos · Eduarda</p>
      </footer>
    </main>
  );
}
