import { Navbar, CookieBanner, BackToTop } from "./Shared";
import { blogPosts } from "./blogData";
import { getLocalArticle } from "./Admin_db";

export default function BlogPage({ slug }) {
  const post = blogPosts[slug] || getLocalArticle(slug);

  if (!post) return (
    <>
      <CookieBanner />
      <div className="bgded overlay" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <header id="header" className="hoc clear">
          <div id="logo" className="one_quarter first">
            <h1><a href="/">Tribaki</a></h1>
            <p>You're in good hands</p>
          </div>
        </header>
        <Navbar activePage="blog" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">Blog</h6>
        </div>
      </div>
      <div className="wrapper row3">
        <main className="hoc container clear">
          <div className="content">
            <p>Article not found. <a href="/">Go back home.</a></p>
          </div>
        </main>
      </div>
      <BackToTop />
    </>
  );

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
        <Navbar activePage="blog" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">Blog</h6>
        </div>
      </div>

      <div className="wrapper row3">
        <main className="hoc container clear">
          <div className="content">
            <div id="gallery">
              <figure>
                <figcaption><h6>{post.title}</h6></figcaption>
              </figure>
            </div>
            <h5>{post.body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}</h5>
          </div>
        </main>
      </div>

      <BackToTop />
    </>
  );
}
