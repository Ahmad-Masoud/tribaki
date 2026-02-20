import { Navbar, CookieBanner, BackToTop } from "./Shared";
export default function ContactPage() {
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
        <Navbar activePage="contact" />
        <div id="breadcrumb" className="hoc clear">
          <h6 className="heading">Contact Us</h6>
        </div>
      </div>
      <div className="wrapper row3">
        <main className="hoc container clear">
          <div className="content"style={{ display: "flex", justifyContent: "center" }}>
            <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
              <h3>GET IN TOUCH</h3>
              <input type="hidden" name="access_key" value="20ac96c7-1d12-44bc-86ae-c8c844f735be" />
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea rows="4" placeholder="Message"></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </main>
      </div>
      <BackToTop />
    </>
  );
}