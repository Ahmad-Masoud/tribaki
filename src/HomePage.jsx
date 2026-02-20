import { CookieBanner, Navbar, BackToTop } from "./Shared";
import { featuredArticles, thisMonthArticles, coloredSectionArticles } from "./data";

export default function HomePage() {
  return (
    <>
      <CookieBanner />
      <div className="bgded overlay" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <header id="header" className="hoc clear">
          <div id="logo" className="one_quarter first">
            <h1>
              <a href="/">Tribaki</a>
            </h1>
            <p>You're in good hands</p>
          </div>
        </header>

        <Navbar activePage="home" />

        <div id="pageintro" className="hoc clear">
          <article>
            <p></p>
            <h3 className="heading">Home</h3>
            <p>
              "Don't focus on having a great blog. Focus on producing a blog that's great for your
              readers."
              <br />
              -Brian Clark-
            </p>
            <footer>
              <a className="btn" href="/contact">
                Contact Us
              </a>
            </footer>
          </article>
        </div>
      </div>
      <div className="wrapper row3">
        <main className="hoc container clear">
          <section id="introblocks">
            <ul className="nospace group">
              {featuredArticles.map((article, i) => (
                <li key={i} className="one_third">
                  <figure>
                    <a className="imgover" href={article.href}>
                      <img src={article.img} alt={article.title} />
                    </a>
                    <figcaption>
                      <h6 className="heading">{article.title}</h6>
                      <p>{article.excerpt}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <div className="wrapper row2">
        <section className="hoc container clear">
          <div className="sectiontitle">
            <h6 className="heading">This Months Favourite</h6>
          </div>
        </section>
      </div>

      <div className="wrapper row3">
        <section className="hoc container clear">
          <section id="introblocks">
            <ul className="nospace group">
              {thisMonthArticles.map((article, i) => (
                <li key={i} className="one_third">
                  <figure>
                    <a className="imgover" href={article.href}>
                      <img src={article.img} alt={article.title} />
                    </a>
                    <figcaption>
                      <h6 className="heading">{article.title}</h6>
                      <p>{article.excerpt}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>

      <div className="wrapper coloured">
        <section id="testimonials" className="hoc container clear">
          <br /><br /><br /><br /><br /><br />
          <section id="introblocks">
            <ul className="nospace group">
              {coloredSectionArticles.map((article, i) => (
                <li key={i} className="one_third">
                  <figure>
                    <a className="imgover" href={article.href}>
                      <img src={article.img} alt={article.title} />
                    </a>
                    <figcaption>
                      <h6 className="heading">{article.title}</h6>
                      <p>{article.excerpt}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>

      <div className="bgded overlay row4" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <footer id="footer" className="hoc clear">
          <div className="center btmspace-50">
            <h6 className="heading">Tribaki</h6>
            <ul className="faico clear">
              <li>
                <a className="faicon-facebook" href="https://www.facebook.com/profile.php?id=100084463202102">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="faicon-instagram" href="https://www.instagram.com/tribaki_business/">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a className="faicon-linkedin" href="https://www.linkedin.com/in/tri-baki-5a0a47247/">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a className="faicon-twitter" href="https://twitter.com/Tribaki_">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
            <p className="nospace">Be covered by all the Social Media noise.</p>
          </div>

          <hr className="btmspace-50" />

          <div className="one_quarter first">
            <h6 className="heading">Subscribe</h6>
            <p className="nospace btmspace-15">Subscribe For Weekly Newsletter</p>
            <form action="#" method="post">
              <fieldset>
                <legend>Newsletter:</legend>
                <input className="btmspace-15" type="text" placeholder="Name" />
                <input className="btmspace-15" type="text" placeholder="Email" />
                <button type="submit" value="submit">
                  Submit
                </button>
              </fieldset>
            </form>
          </div>

          <div className="one_quarter">
            <h6 className="heading">Most Popular Blogs</h6>
            <ul className="nospace linklist">
              <li><a href="/blog/jwst">James Webb Space Telescope (JWST)</a></li>
              <li><a href="/blog/osiris-rex">OSIRIS-REx Mission</a></li>
              <li><a href="/blog/nvidia-mediatek">Nvidia and MediaTek Join Forces</a></li>
            </ul>
          </div>

          <div className="one_quarter">
            <h6 className="heading">OTHER BLOGS</h6>
            <ul className="nospace linklist">
              <li><a href="/blog/cpu-war">The CPU War of 2024</a></li>
              <li><a href="/blog/euro-jupiter">Europe's Jupiter Mission</a></li>
              <li><a href="/blog/generative-ai">Fixing Market Demand With AI</a></li>
            </ul>
          </div>

          <div className="one_quarter">
            <br /><br /><br />
            <ul className="nospace linklist">
              <li><a href="/blog/calix">Calix Industry Standards</a></li>
              <li><a href="/blog/cyber-chiefs">Cyber Chiefs Brace for Attacks</a></li>
              <li><a href="/blog/rsa-conf">RSA Conference Rebounds</a></li>
            </ul>
          </div>
        </footer>
      </div>

      <div className="wrapper row5">
        <div id="copyright" className="hoc clear">
          <p className="fl_left">Copyright &copy; 2023 - All Rights Reserved - <a href="#">Tribaki</a></p>
          <p className="fl_right">
            Template by{" "}
            <a target="_blank" href="https://www.os-templates.com/" title="Free Website Templates">
              OS Templates
            </a>
          </p>
        </div>
      </div>

      <BackToTop />
    </>
  );
}
