import { useState, useEffect } from "react";

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);
  for (const part of decoded.split("; ")) {
    if (part.startsWith(name + "=")) return part.substring(name.length + 1);
  }
  return null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("cookie")) setVisible(true);
  }, []);

  function allow() {
    setCookie("cookie", "true", 30);
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <div style={{ position: "absolute", zIndex: 9998 }}>
      <div id="cookies" style={{ padding: 0, margin: 0, display: "block" }}>
        <div className="container1">
          <div className="subcontainer1">
            <div className="cookies">
              <p>
                We use third-party cookies in order to personalize your site experience.{" "}
                <a href="#">More Info</a>
              </p>
              <button id="cookies-btn" onClick={allow}>
                Allow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar({ activePage = "home" }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section id="navwrapper" className="hoc clear">
      <nav id="mainav">
        <ul className="clear">
          <li className={activePage === "home" ? "active" : ""}>
            <a href="/">Home</a>
          </li>
          <li
            className={activePage === "gallery" ? "active" : ""}
            onMouseEnter={() => setGalleryOpen(true)}
            onMouseLeave={() => setGalleryOpen(false)}
          >
            <a className="drop" href="#">
              Gallery
            </a>
            {galleryOpen && (
              <ul>
                <li>
                  <a href="/gallery/technology">Technology</a>
                </li>
                <li>
                  <a href="/gallery/space">Space Exploration</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="https://patreon.com/Tribaki">Support Us</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <a
      id="backtotop"
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className="fas fa-chevron-up"></i>
    </a>
  );
}
