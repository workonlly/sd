"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xyzabc123", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: "Newsletter Signup",
          message: `New newsletter subscriber: ${email}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="professional@organization.com"
        className="flex-grow bg-[var(--surface-elevated)] border-b-2 border-[var(--border-strong)] focus:border-[var(--brand)] border-t-0 border-x-0 px-4 py-3 rounded-lg outline-none transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary px-8 py-3 disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {message && (
        <div
          className={`mt-2 text-sm font-medium ${
            status === "success" ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
