"use client";

import { FormEvent, useState } from "react";

interface ContactFormProps {
  variant?: "full" | "minimal";
}

export default function ContactForm({ variant = "full" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("An error occurred. Please try again.");
    }
  }

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={status === "loading"}
          className="w-full bg-[var(--surface-elevated)] border-b-2 border-[var(--border-strong)] focus:border-[var(--brand)] border-t-0 border-x-0 px-4 py-3 outline-none transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
        />
        <textarea
          placeholder="Your message here..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          disabled={status === "loading"}
          className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--brand)] transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)] rounded-md resize-none"
          rows={4}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full btn-primary px-6 py-3 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {statusMessage && (
          <div
            className={`text-sm font-medium text-center ${
              status === "success" ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={status === "loading"}
          className="bg-[var(--surface-elevated)] border-b-2 border-[var(--border-strong)] focus:border-[var(--brand)] border-t-0 border-x-0 px-4 py-3 outline-none transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
        />
        <input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={status === "loading"}
          className="bg-[var(--surface-elevated)] border-b-2 border-[var(--border-strong)] focus:border-[var(--brand)] border-t-0 border-x-0 px-4 py-3 outline-none transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
        />
      </div>
      <textarea
        placeholder="Your message..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        disabled={status === "loading"}
        className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--brand)] transition-colors text-[var(--text-main)] placeholder:text-[var(--text-muted)] rounded-md resize-none"
        rows={6}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-primary px-8 py-4 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {statusMessage && (
        <div
          className={`text-sm font-medium text-center ${
            status === "success" ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
}
