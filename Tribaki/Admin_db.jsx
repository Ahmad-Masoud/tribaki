import { useState } from 'react';
import { Navbar, CookieBanner, BackToTop } from "./Shared";
import SubscribeSection from "./SubscribeSection";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

// ── Article Form ──────────────────────────────────────────────────────────────
function ArticleForm({ onSave, onCancel, initial }) {
  const [title, setTitle]       = useState(initial?.title    || "");
  const [slug, setSlug]         = useState(initial?.slug     || "");
  const [category, setCategory] = useState(initial?.category || "Space");
  const [img, setImg]           = useState(initial?.img      || "");
  const [excerpt, setExcerpt]   = useState(initial?.excerpt  || "");
  const [body, setBody]         = useState(initial?.body     || "");
  const [errors, setErrors]     = useState({});

  const autoSlug = (val) =>
    val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!initial) setSlug(autoSlug(val));
  };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!slug.trim())  e.slug  = "Slug is required.";
    if (!body.trim())  e.body  = "Body is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="content">
      <h3 className="heading">{initial ? "Edit Article" : "Add New Article"}</h3>
      <br />

      <p><strong>Title *</strong></p>
      <input
        type="text"
        placeholder="Article title"
        value={title}
        onChange={e => handleTitleChange(e.target.value)}
        style={{ width: "100%", marginBottom: 4 }}
      />
      {errors.title && <p style={{ color: "red", margin: "0 0 12px" }}>{errors.title}</p>}
      <br />

      <p><strong>Slug * </strong><small>(URL: /blog/<em>{slug || "..."}</em>)</small></p>
      <input
        type="text"
        placeholder="my-article-slug"
        value={slug}
        onChange={e => setSlug(autoSlug(e.target.value))}
        style={{ width: "100%", marginBottom: 4 }}
      />
      {errors.slug && <p style={{ color: "red", margin: "0 0 12px" }}>{errors.slug}</p>}
      <br />

      <p><strong>Category</strong></p>
      <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginBottom: 16 }}>
        <option>Space</option>
        <option>Technology</option>
      </select>
      <br /><br />

      <p><strong>Image URL</strong></p>
      <input
        type="text"
        placeholder="images/demo/blogimg/yourimage.jpg"
        value={img}
        onChange={e => setImg(e.target.value)}
        style={{ width: "100%", marginBottom: 16 }}
      />
      <br />

      <p><strong>Excerpt</strong> <small>(shown on homepage cards)</small></p>
      <textarea
        placeholder="Short summary..."
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
        rows={3}
        style={{ width: "100%", marginBottom: 16 }}
      />
      <br />

      <p><strong>Body *</strong> <small>(blank line = new paragraph)</small></p>
      <textarea
        placeholder={"Write the full article here...\n\nEach blank line creates a new paragraph."}
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={14}
        style={{ width: "100%", marginBottom: 4 }}
      />
      {errors.body && <p style={{ color: "red", margin: "0 0 12px" }}>{errors.body}</p>}
      <br />

      <button className="btn" onClick={() => { if (validate()) onSave({ title, slug, category, img, excerpt, body }); }}>
        {initial ? "Save Changes" : "Publish Article"}
      </button>
      &nbsp;&nbsp;
      <button className="btn" onClick={onCancel}>Cancel</button>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [articles, setArticles] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tribaki_articles") || "[]"); }
    catch { return []; }
  });
  const [view, setView]       = useState("list");
  const [editing, setEditing] = useState(null);
  const [toast, setToast]     = useState("");

  const persist = (arr) => localStorage.setItem("tribaki_articles", JSON.stringify(arr));

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleSave = (data) => {
    let updated;
    if (editing) {
      updated = articles.map(a => a.slug === editing.slug ? data : a);
      showToast("Article updated successfully.");
    } else {
      if (articles.find(a => a.slug === data.slug)) {
        alert(`Slug "${data.slug}" already exists. Choose a different one.`); return;
      }
      updated = [data, ...articles];
      showToast("Article published successfully.");
    }
    setArticles(updated); persist(updated);
    setView("list"); setEditing(null);
  };

  const handleDelete = (slug) => {
    const updated = articles.filter(a => a.slug !== slug);
    setArticles(updated); persist(updated); showToast("Article deleted.");
  };

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
        <Navbar activePage="home" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">Admin Dashboard</h6>
        </div>
      </div>

      <div className="wrapper row3">
        <main className="hoc container clear">

          {toast && (
            <p style={{ background: "#dff0d8", border: "1px solid #3c763d", color: "#3c763d", padding: "10px 16px", marginBottom: 16 }}>
              {toast}
            </p>
          )}

          {view === "list" && (
            <div className="content">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 className="heading">Articles</h3>
                <div>
                  <button className="btn" onClick={() => { setEditing(null); setView("new"); }}>
                    + Add New Article
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn" onClick={onLogout}>Logout</button>
                </div>
              </div>

              {articles.length === 0 ? (
                <p>No articles yet. <a href="#" onClick={e => { e.preventDefault(); setView("new"); }}>Add your first one.</a></p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                      <th style={{ padding: "8px 12px" }}>Title</th>
                      <th style={{ padding: "8px 12px" }}>Category</th>
                      <th style={{ padding: "8px 12px" }}>Slug</th>
                      <th style={{ padding: "8px 12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map(a => (
                      <tr key={a.slug} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "8px 12px" }}>{a.title}</td>
                        <td style={{ padding: "8px 12px" }}>{a.category}</td>
                        <td style={{ padding: "8px 12px" }}>/blog/{a.slug}</td>
                        <td style={{ padding: "8px 12px" }}>
                          <a href={`/blog/${a.slug}`} target="_blank" rel="noreferrer">View</a>
                          &nbsp;|&nbsp;
                          <a href="#" onClick={e => { e.preventDefault(); setEditing(a); setView("edit"); }}>Edit</a>
                          &nbsp;|&nbsp;
                          <a href="#" style={{ color: "red" }} onClick={e => { e.preventDefault(); if (window.confirm("Delete this article?")) handleDelete(a.slug); }}>Delete</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {(view === "new" || view === "edit") && (
            <ArticleForm
              initial={editing}
              onSave={handleSave}
              onCancel={() => { setView("list"); setEditing(null); }}
            />
          )}

        </main>
      </div>

      {/* Footer — same as HomePage */}
      <div className="bgded overlay row4" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <footer id="footer" className="hoc clear">
          <div className="center btmspace-50">
            <h6 className="heading">Tribaki</h6>
            <ul className="faico clear">
              <li><a className="faicon-facebook" href="https://www.facebook.com/profile.php?id=100084463202102"><i className="fab fa-facebook"></i></a></li>
              <li><a className="faicon-instagram" href="https://www.instagram.com/tribaki_business/"><i className="fab fa-instagram"></i></a></li>
              <li><a className="faicon-linkedin" href="https://www.linkedin.com/in/tri-baki-5a0a47247/"><i className="fab fa-linkedin"></i></a></li>
              <li><a className="faicon-twitter" href="https://twitter.com/Tribaki_"><i className="fab fa-twitter"></i></a></li>
            </ul>
            <p className="nospace">Be covered by all the Social Media noise.</p>
          </div>
          <hr className="btmspace-50" />
          <SubscribeSection />
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
            Template by <a target="_blank" href="https://www.os-templates.com/" title="Free Website Templates">OS Templates</a>
          </p>
        </div>
      </div>

      <BackToTop />
    </>
  );
}

// ── Helper: read admin articles from localStorage (used by BlogPage) ──────────
export function getLocalArticle(slug) {
  try {
    const articles = JSON.parse(localStorage.getItem("tribaki_articles") || "[]");
    return articles.find(a => a.slug === slug) || null;
  } catch { return null; }
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminDB() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      setError("Incorrect username or password.");
    }
  };

  if (loggedIn) return <Dashboard onLogout={() => { setLoggedIn(false); setUsername(""); setPassword(""); }} />;

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
        <Navbar activePage="home" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">Admin Login</h6>
        </div>
      </div>

      <div className="wrapper row3">
        <main className="hoc container clear">
          <div className="content" style={{ maxWidth: 400, margin: "0 auto" }}>
            <h3 className="heading">Login</h3>
            <br />
            <p><strong>Username</strong></p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", marginBottom: 16 }}
            />
            <p><strong>Password</strong></p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", marginBottom: 16 }}
            />
            {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
        </main>
      </div>

      <div className="bgded overlay row4" style={{ backgroundImage: "url('/mainbg.jpg')" }}>
        <footer id="footer" className="hoc clear">
          <div className="center btmspace-50">
            <h6 className="heading">Tribaki</h6>
            <ul className="faico clear">
              <li><a className="faicon-facebook" href="https://www.facebook.com/profile.php?id=100084463202102"><i className="fab fa-facebook"></i></a></li>
              <li><a className="faicon-instagram" href="https://www.instagram.com/tribaki_business/"><i className="fab fa-instagram"></i></a></li>
              <li><a className="faicon-linkedin" href="https://www.linkedin.com/in/tri-baki-5a0a47247/"><i className="fab fa-linkedin"></i></a></li>
              <li><a className="faicon-twitter" href="https://twitter.com/Tribaki_"><i className="fab fa-twitter"></i></a></li>
            </ul>
            <p className="nospace">Be covered by all the Social Media noise.</p>
          </div>
          <hr className="btmspace-50" />
          <SubscribeSection />
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
            Template by <a target="_blank" href="https://www.os-templates.com/" title="Free Website Templates">OS Templates</a>
          </p>
        </div>
      </div>

      <BackToTop />
    </>
  );
}
