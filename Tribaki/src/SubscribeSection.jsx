import { useState } from "react";

export default function SubscribeSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      alert(data.message || "Subscribed successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="one_quarter first">
      <h6 className="heading">Subscribe</h6>
      <p className="nospace btmspace-15">Subscribe For Weekly Newsletter</p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Newsletter:</legend>
          <input
            className="btmspace-15"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="btmspace-15"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}