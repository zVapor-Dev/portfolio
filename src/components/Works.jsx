import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ project, index }) => (
  <motion.article
    variants={fadeIn("up", "spring", index * 0.12, 0.8)}
    className="group vapor-card vapor-card-hover flex flex-col overflow-hidden"
  >
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
      <img
        src={project.image}
        alt={project.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-vapor-bg/80 via-transparent to-transparent" />
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="font-display text-xl font-semibold text-white">
        {project.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-vapor-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-vapor-cyan transition-colors hover:text-white"
          >
            {link.label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="opacity-70"
              aria-hidden="true"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </motion.article>
);

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-label">Selected work</p>
        <h2 className="section-title mt-3">Projects that shipped.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.15, 0.8)}
        className="mt-4 max-w-2xl text-base text-vapor-muted"
      >
        A focused set of projects — open-source packages, this portfolio, and
        production Discord tooling. No filler, no work-in-progress badges.
      </motion.p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
