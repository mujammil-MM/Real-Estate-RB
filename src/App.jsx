import React, { useEffect, useMemo, useState } from "react";

const asset = (path) => `/assets/${path}`;

const residences = [
  {
    id: "duplex",
    nav: "Lumiere Duplex",
    label: "01",
    title: "Lumiere Duplex Residences",
    shortTitle: "Lumiere Duplex",
    area: "2,470",
    copy: "Two-story luxury apartments that feature sunlit living spaces, private terraces, and a selection of exclusive amenities.",
    modalCopy: "Vertical living shaped by double-height daylight, quiet sleeping rooms, warm timber, and private outdoor thresholds.",
    cover: asset("duplex/_livings-img-1--d.jpg"),
    images: [
      ["duplex/duplex living room.jpg", "Duplex living room with warm neutral seating."],
      ["duplex/duplex kitchen.jpg", "Duplex kitchen with marble island and light wood cabinetry."],
      ["duplex/duplex bedroom.jpg", "Duplex bedroom with paneled headboard and soft lighting."],
      ["duplex/duplex bathroom.jpg", "Duplex bathroom with freestanding tub and wood vanity."],
    ],
  },
  {
    id: "crown",
    nav: "Crown Penthouse",
    label: "02",
    title: "Crown Jewel Penthouse",
    shortTitle: "Crown Penthouse",
    area: "4,180",
    copy: "With panoramic views, curated interiors, and spaces shaped for comfort and sophistication, the penthouse becomes more than a home.",
    modalCopy: "A high-floor sanctuary with generous reception spaces, a private office, layered materials, and a cinematic sense of arrival.",
    cover: asset("crown/livings-img-3--d.jpg"),
    images: [
      ["crown/crown jewel living room.jpg", "Penthouse living room with plants, wood, and daylight."],
      ["crown/crown jewel kitchen.jpg", "Penthouse kitchen with suspended lights and marble finishes."],
      ["crown/crown jewel office.jpg", "Penthouse office with book wall and wood desk."],
      ["crown/crown jewel bathroom.jpg", "Penthouse bathroom with marble vanity and city view."],
    ],
  },
  {
    id: "aurelia",
    nav: "Aurelia Suites",
    label: "03",
    title: "Aurelia Garden Suites",
    shortTitle: "Aurelia Suites",
    area: "1,860",
    copy: "Ground-level sanctuaries offering serene private gardens and a seamless blend of indoor comfort and outdoor tranquility.",
    modalCopy: "Garden rooms, soft daylight, natural timber, and private outdoor edges give the suite a slower restorative tempo.",
    cover: asset("aurelia/livings-img-2--d.jpg"),
    images: [
      ["aurelia/aurelia garden living room.jpg", "Garden suite living room with sofa and courtyard view."],
      ["aurelia/aurelia garden kitchen.jpg", "Garden suite kitchen with white cabinetry and hanging plants."],
      ["aurelia/aurelia garden bedroom.jpg", "Garden suite bedroom with dark curtains and forest view."],
      ["aurelia/aurelia garden bathroom.jpg", "Garden suite bathroom with freestanding tub and plants."],
    ],
  },
];

const splitWord = (word) => word.split("").map((letter, index) => (
  <span className="char-mask" key={`${letter}-${index}`}>
    <span style={{ "--i": index }}>{letter}</span>
  </span>
));

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " menu-open" : ""}`} aria-label="Primary navigation">
      <a className="logo" href="#top" aria-label="Elyse Residence home">ELYSE</a>
      <nav className="nav">
        {residences.map((home) => <a key={home.id} href={`#${home.id}`}>{home.nav}</a>)}
      </nav>
      <a className="btn ghost nav-cta" href="#book-a-visit">Book a Visit</a>
      <button className="menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
        <span />
        <span />
      </button>
      <div className="mobile-menu">
        {residences.map((home) => <a key={home.id} href={`#${home.id}`} onClick={() => setOpen(false)}>{home.nav}</a>)}
        <a href="#book-a-visit" onClick={() => setOpen(false)}>Book a Visit</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <video className="hero-video" src={asset("home/hero-video-1.mp4")} autoPlay muted loop playsInline poster={asset("home/gallery-1.jpg")} />
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-title-wrap">
          <h1 aria-label="Elyse">{splitWord("Elyse")}</h1>
          <p className="hero-subtitle">holistic luxury in perfect harmony</p>
        </div>
        <p className="hero-copy">
          Welcome to Elyse Residence, where timeless design, wellness-focused living and cultural enrichment converge to create an unparalleled sanctuary of elegance and serenity.
        </p>
      </div>
      <a className="scroll-cue" href="#about"><span />Scroll</a>
    </section>
  );
}

function About() {
  const metrics = [
    ["60", "%", "green spaces for tranquility & wellness."],
    ["30", "", "exclusive residences, each tailored for comfort & elegance."],
    ["150", "k sq. ft.", "green spaces for tranquility & wellness."],
    ["24", "/7", "concierge services, meeting every need effortlessly."],
  ];

  return (
    <section className="about section" id="about">
      <div className="section-label" data-reveal>(About)</div>
      <div className="about-grid">
        <h2 data-reveal>timeless design wellness-focused living</h2>
        <div className="about-copy" data-reveal>
          <div className="image-mask tall">
            <img src={asset("home/gallery-2.jpg")} alt="Modern living room with a beige sectional sofa, black coffee table, abstract wall art, and floor-to-ceiling window." />
          </div>
          <p>Every element of Elyse Residence reflects a commitment to excellence. From the timeless elegance of its interiors to its thoughtfully curated amenities, the property embodies a holistic approach to luxury living.</p>
          <p>Whether you are seeking a serene retreat, cultural hub, or a space that fosters personal growth, Elyse Residence offers it all.</p>
        </div>
      </div>
      <div className="metrics" data-reveal>
        {metrics.map(([value, unit, text], index) => (
          <article key={text} style={{ "--metric-index": index }}>
            <strong>
              <span className="metric-value">{value}</span>
              <span className="metric-unit">{unit}</span>
            </strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Livings() {
  const [active, setActive] = useState(0);
  const home = residences[active];

  return (
    <section className="livings section" id="livings">
      <div className="section-label" data-reveal>(our livings)</div>
      <div className="projects-layout">
        <div className="project-titles" data-reveal>
          {residences.map((item, index) => (
            <button
              id={item.id}
              className={active === index ? "is-active" : ""}
              type="button"
              key={item.id}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>({item.label})</span>
              {item.title}
            </button>
          ))}
        </div>
        <div className="project-stage" data-reveal>
          <div className="project-image-frame" key={home.id}>
            <img src={home.cover} alt={`${home.title} preview.`} />
          </div>
          <div className="project-copy">
            <p>{home.copy}</p>
            <a className="btn" href="#book-a-visit">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  const beliefs = [
    ["Holistic well-being", "Spaces designed to nurture the mind, body, and soul."],
    ["Discretion & exclusivity", "Privacy and personal growth at the forefront."],
    ["Cultural enrichment", "Artful rooms that deepen daily connection."],
    ["Community & connection", "Intimate shared spaces composed for belonging."],
    ["Sustainable elegance", "Luxury that respects our environment."],
  ];

  return (
    <section className="beliefs">
      <div className="section label-wrap">
        <div className="section-label" data-reveal>(Our beliefs)</div>
        <h2 data-reveal>A Vision of Inspired Living</h2>
      </div>
      <div className="beliefs-grid section">
        <div className="belief-images" data-reveal>
          <div className="image-mask"><img src={asset("home/gallery-1.jpg")} alt="Modern living room with a gray sectional sofa and TV." /></div>
          <div className="image-mask small"><img src={asset("home/gallery-8.jpg")} alt="Modern living room with beige sofa and wood panel accent wall." /></div>
        </div>
        <div className="belief-card-list">
          <p className="belief-intro" data-reveal>To inspire and nurture an enriched lifestyle that harmonizes beauty, wellness, and cultural connection, creating a sanctuary that feels like home.</p>
          {beliefs.map(([title, text], index) => (
            <article className="belief-card" data-reveal key={title}>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span>( {index + 1} )</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialGallery() {
  const rowOne = ["home/gallery-4.jpg", "home/gallery-7.jpg", "home/gallery-5.jpg", "home/gallery-6.jpg"];
  const rowTwo = ["home/gallery-8.jpg", "home/gallery-11.jpg", "aurelia/aurelia garden garden.jpg", "crown/crown jewel bedroom.jpg"];

  return (
    <section className="gallery-marquee" aria-label="Elyse residence image gallery">
      <div className="marquee-track">
        {[...rowOne, ...rowOne].map((src, index) => <img key={`${src}-${index}`} src={asset(src)} alt="" />)}
      </div>
      <div className="marquee-track reverse">
        {[...rowTwo, ...rowTwo].map((src, index) => <img key={`${src}-${index}`} src={asset(src)} alt="" />)}
      </div>
    </section>
  );
}

function Amenities() {
  const items = [
    ["home/gallery-5.jpg", "Wellness-centered amenities", "From private fitness studios to guided meditation sessions, our amenities are designed to enhance your well-being and foster a sense of harmony."],
    ["home/gallery-6.jpg", "Art inspired spaces", "From artful communal lounges to thoughtfully curated design details, every environment celebrates a rich sense of place."],
    ["home/gallery-8.jpg", "Nature-infused retreats", "Garden pathways, quiet courtyards, and softly landscaped outdoor rooms provide moments of calm and restorative beauty."],
  ];

  return (
    <section className="amenities section">
      <div className="amenity-sticky">
        <div className="section-label" data-reveal>(Amenities)</div>
        <h2 data-reveal>spaces for ritual, restoration, and art</h2>
      </div>
      <div className="amenity-list">
        {items.map(([src, title, text], index) => (
          <article className="amenity-panel" data-reveal key={title}>
            <span>0{index + 1}</span>
            <div className="image-mask"><img src={asset(src)} alt={title} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResidenceDetails() {
  const [active, setActive] = useState(residences[0].id);
  const home = useMemo(() => residences.find((item) => item.id === active), [active]);

  return (
    <section className="detail section" aria-label="Residence detail gallery">
      <div className="detail-tabs" data-reveal>
        {residences.map((item) => (
          <button className={active === item.id ? "is-active" : ""} type="button" key={item.id} onClick={() => setActive(item.id)}>
            {item.shortTitle}
          </button>
        ))}
      </div>
      <div className="detail-head" data-reveal>
        <p>({home.label})</p>
        <h2>{home.title}</h2>
        <div>
          <strong>{home.area}</strong>
          <span>sq. ft. total area</span>
        </div>
      </div>
      <p className="detail-copy" data-reveal>{home.modalCopy}</p>
      <div className="room-grid" key={home.id}>
        {home.images.map(([src, alt], index) => (
          <div className={`image-mask room room-${index + 1}`} data-reveal key={src}>
            <img src={asset(src)} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const questions = [
    ["What types of homes are available?", "Elyse offers a selection of refined living spaces, including garden suites, duplex residences, and a signature penthouse. Each home is thoughtfully designed to balance elegance, comfort, and a deep connection to the surrounding landscape."],
    ["What makes Elyse Residence unique?", "Elyse combines timeless architectural design, a wellness-focused lifestyle, and a serene coastal-mountain setting. Every space is thoughtfully crafted to inspire calm and refined harmony."],
    ["What wellness amenities are available to residents?", "Residents enjoy access to a private fitness studio, a spa and wellness center, a meditation lounge, rooftop gardens, walking paths, and landscaped courtyards."],
    ["How private and secure is the community?", "Elyse Residence is designed as an intimate, low-density environment with controlled access, discreet internal pathways, and homes positioned to ensure tranquility."],
  ];

  return (
    <section className="faq section" id="faq">
      <div className="faq-heading">
        <div className="section-label" data-reveal>(FAQ)</div>
        <h2 data-reveal>Your Questions, Answered</h2>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <details data-reveal key={question} open={index === 0}>
            <summary><span>( {index + 1} )</span>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Visit() {
  const [message, setMessage] = useState("");

  return (
    <section className="cta" id="book-a-visit">
      <img src={asset("home/gallery-11.jpg")} alt="Modern glass-walled house lit warmly at dusk with surrounding trees and garden." />
      <div className="cta-shade" />
      <div className="cta-content section">
        <div className="cta-heading" data-reveal>
          <h2>Discover the Essence of Calm Living</h2>
          <p>Experience the harmony of timeless design and wellness-centered living. Schedule a private viewing or request a brochure to begin your journey toward refined serenity.</p>
        </div>
        <form data-reveal onSubmit={(event) => {
          event.preventDefault();
          setMessage("Thank you! Your submission has been received.");
          event.currentTarget.reset();
        }}>
          <h3>Envision Your Life at Elyse</h3>
          <p>Our manager will contact you as soon as possible.</p>
          <input type="text" name="name" placeholder="Name" autoComplete="name" required />
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
          <input type="tel" name="phone" placeholder="Phone" autoComplete="tel" />
          <div className="form-bottom">
            <button className="btn" type="submit">Request</button>
            <small>By sending your request, you are agreeing to our privacy policy. We promise to keep your personal information safe and secure.</small>
          </div>
          <output>{message}</output>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>(Get in touch)</h3>
        <a className="logo footer-logo" href="#top">ELYSE</a>
      </div>
      <address>
        <h3>(location)</h3>
        <p>Cala Aurelia, Liguria, Italy</p>
      </address>
      <div>
        <h3>(Contact)</h3>
        <a href="mailto:info@elyseresidence.com">info@elyseresidence.com</a>
        <a href="tel:+3901874522900">+3901874522900</a>
      </div>
      <p className="copyright">©2025. Elyse Residence. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Livings />
        <Beliefs />
        <EditorialGallery />
        <Amenities />
        <ResidenceDetails />
        <Faq />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
