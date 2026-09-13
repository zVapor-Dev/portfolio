import { motion } from "framer-motion";
import { VaporSceneCanvas } from "./canvas";
import { site } from "../constants";
import { styles } from "../styles";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-vapor-mesh" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />

      <div
        className={`relative z-10 mx-auto grid w-full max-w-6xl ${styles.paddingX} gap-12 pt-28 pb-20 lg:grid-cols-2 lg:items-center lg:gap-8`}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            {site.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Building products
            <br />
            <span className="bg-gradient-to-r from-vapor-cyan via-vapor-violet to-vapor-pink bg-clip-text text-transparent">
              for the web.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-vapor-muted sm:text-lg"
          >
            {site.title} based in the {site.location}. I ship full-stack web
            applications with TypeScript, React, and modern infrastructure —
            with a background in Discord bot development and community tooling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#work" className="btn-primary">
              View selected work
            </a>
            <a href="#contact" className="btn-ghost">
              Contact me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 font-mono text-xs text-vapor-muted"
          >
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-vapor-cyan"
            >
              GitHub
            </a>
            <span className="text-white/20">/</span>
            <a
              href={site.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-vapor-cyan"
            >
              @zvapor_
            </a>
            <span className="text-white/20">/</span>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-vapor-cyan"
            >
              {site.email}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden h-[420px] lg:block"
        >
          <div className="absolute inset-0 rounded-2xl bg-vapor-gradient opacity-50 blur-3xl" />
          <div className="relative h-full w-full rounded-2xl border border-white/[0.06] bg-vapor-surface/30 backdrop-blur-sm">
            <VaporSceneCanvas />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll to about section"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-vapor-cyan"
          />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
