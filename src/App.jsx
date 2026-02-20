import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import GalleryPage from "./GalleryPage";
import BlogPage from "./BlogPage";

function parsePath(path) {
  if (path === "/contact") return { page: "contact" };
  if (path === "/gallery/space") return { page: "gallery", type: "space" };
  if (path === "/gallery/technology") return { page: "gallery", type: "tech" };
  const blogMatch = path.match(/^\/blog\/(.+)$/);
  if (blogMatch) return { page: "blog", slug: blogMatch[1] };
  return { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);

    const onClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto")) return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      setRoute(parsePath(href));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  switch (route.page) {
    case "contact": return <ContactPage />;
    case "gallery": return <GalleryPage type={route.type} />;
    case "blog": return <BlogPage slug={route.slug} />;
    default: return <HomePage />;
  }
}
