import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { SectionWrapper } from "../hoc";
import { site } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_v6ts93f",
        "template_xstw39o",
        {
          from_name: form.name,
          to_name: "Daan",
          from_email: form.email,
          to_email: site.email,
          message: form.message,
        },
        "whEzBLs4InYBGH2Kw"
      )
      .then(() => {
        setLoading(false);
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setStatus("error");
      });
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
      <motion.div variants={fadeIn("right", "spring", 0.2, 0.8)}>
        <p className="section-label">Contact</p>
        <h2 className="section-title mt-3">Let's talk.</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-vapor-muted">
          Open to collaborations, freelance work, and interesting product ideas.
          Drop a message or reach out directly.
        </p>

        <div className="mt-8 space-y-4">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 text-sm text-vapor-muted transition-colors hover:text-vapor-cyan"
          >
            <span className="font-mono text-xs text-vapor-cyan">email</span>
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-vapor-muted transition-colors hover:text-vapor-cyan"
          >
            <span className="font-mono text-xs text-vapor-cyan">github</span>
            zVapor-Dev
          </a>
          <a
            href={site.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-vapor-muted transition-colors hover:text-vapor-cyan"
          >
            <span className="font-mono text-xs text-vapor-cyan">twitter</span>
            @zvapor_
          </a>
        </div>
      </motion.div>

      <motion.div variants={fadeIn("left", "spring", 0.3, 0.8)}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="vapor-card space-y-5 p-6 sm:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="What's on your mind?"
              className="input-field resize-none"
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-emerald-400" role="status">
              Message sent — I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400" role="alert">
              Something went wrong. Please try again or email me directly.
            </p>
          )}

          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
            {loading ? "Sending…" : "Send message"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
