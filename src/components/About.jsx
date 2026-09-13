import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { site } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const highlights = [
  {
    label: "Focus",
    value: "Full-stack web & product engineering",
  },
  {
    label: "Stack",
    value: "TypeScript, React, Node, Prisma",
  },
  {
    label: "Deploy",
    value: "Vercel, Cloudflare, Docker",
  },
  {
    label: "Background",
    value: "Discord bots & community tooling",
  },
];

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-label">About</p>
        <h2 className="section-title mt-3">
          Product engineer,{" "}
          <span className="text-vapor-muted">not just a template.</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.8)}
          className="space-y-5 text-base leading-relaxed text-vapor-muted"
        >
          <p>
            I'm <span className="text-white">{site.name}</span> (
            <span className="font-mono text-vapor-cyan">{site.handle}</span>
            ) — a {site.title.toLowerCase()} based in the {site.location}. I
            build web products end to end: typed APIs, polished interfaces, and
            deployments that stay maintainable as features grow.
          </p>
          <p>
            My work spans modern React frontends, Node backends with Prisma,
            auth with Clerk, and infrastructure on Vercel and Cloudflare. I care
            about clear architecture, accessible UI, and shipping things people
            actually use.
          </p>
          <p>
            Before focusing on web, I spent years building Discord bots and
            community tools — including published open-source packages and bots
            serving thousands of servers. That background taught me how to ship
            reliable software under real user pressure.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.3, 0.8)}
          className="grid gap-3 sm:grid-cols-2"
        >
          {highlights.map((item, index) => (
            <div
              key={item.label}
              className="vapor-card vapor-card-hover p-5"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-vapor-cyan">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-white">
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
