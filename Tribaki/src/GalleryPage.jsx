import { Navbar, CookieBanner, BackToTop } from "./Shared";
import { spaceGallery, techGallery } from "./data";

export default function GalleryPage({ type }) {
  const items = type === "space" ? spaceGallery : techGallery;
  const title = type === "space" ? "Space Exploration" : "Technology";

  return (
    <>
      <CookieBanner />
      <div className="bgded overlay" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <header id="header" className="hoc clear">
          <div id="logo" className="one_quarter first">
            <h1><a href="/">Tribaki</a></h1>
            <p>You're in good hands</p>
          </div>
        </header>
        <Navbar activePage="gallery" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">{title}</h6>
          <h6>A directory of wonderful things</h6>
        </div>
      </div>

      <div className="wrapper row3">
        <main className="hoc container clear">
          <div className="content">
            <div id="gallery">
              <figure>
                <ul className="nospace clear">
                  {items.map((item, i) => (
                    <li key={i} className="one_quarter">
                      <a href={item.href}>
                        <img src={item.img} alt={item.title} />
                        <p>{item.title}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </figure>
            </div>
          </div>
        </main>
      </div>

      <BackToTop />
    </>
  );
}
