import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const categoryColors = {
  language: "border-sky-500/30 text-sky-300",
  frontend: "border-violet-500/30 text-violet-300",
  backend: "border-emerald-500/30 text-emerald-300",
  database: "border-amber-500/30 text-amber-300",
  platform: "border-cyan-500/30 text-cyan-300",
};

const Tech = () => {
  const grouped = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  const categoryLabels = {
    language: "Languages",
    frontend: "Frontend",
    backend: "Backend",
    database: "Data",
    platform: "Platform & Infra",
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-label">Stack</p>
        <h2 className="section-title mt-3">Tools I reach for.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.15, 0.8)}
        className="mt-4 max-w-2xl text-base text-vapor-muted"
      >
        A pragmatic toolkit for shipping typed, deployable web products — from
        UI components to auth, databases, and edge infrastructure.
      </motion.p>

      <div className="mt-12 space-y-10">
        {Object.entries(grouped).map(([category, items], groupIndex) => (
          <motion.div
            key={category}
            variants={fadeIn("up", "spring", groupIndex * 0.1, 0.8)}
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-vapor-muted">
              {categoryLabels[category] || category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {items.map((tech) => (
                <span
                  key={tech.name}
                  className={`inline-flex items-center rounded-lg border bg-white/[0.03] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06] ${
                    categoryColors[tech.category] || "border-white/10 text-white"
                  }`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "stack");
