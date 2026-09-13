import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.8)}
    className="relative pl-8 sm:pl-10"
  >
    <div className="absolute left-0 top-0 flex h-full flex-col items-center">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
        style={{ backgroundColor: experience.iconBg }}
      >
        <img
          src={experience.icon}
          alt=""
          className="h-5 w-5 object-contain"
        />
      </div>
      <div className="mt-2 w-px flex-1 bg-gradient-to-b from-vapor-cyan/40 to-transparent" />
    </div>

    <div className="vapor-card vapor-card-hover pb-8 pl-2 sm:pl-4">
      <div className="flex flex-wrap items-start justify-between gap-2 p-6 pb-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-white">
            {experience.title}
          </h3>
          <p className="mt-1 text-sm text-vapor-muted">{experience.company}</p>
        </div>
        <span className="tag shrink-0">{experience.date}</span>
      </div>

      <ul className="space-y-3 px-6 pb-6">
        {experience.points.map((point, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-vapor-muted"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vapor-cyan" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-label">Experience</p>
        <h2 className="section-title mt-3">Where I've built.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.15, 0.8)}
        className="mt-4 max-w-2xl text-base text-vapor-muted"
      >
        A mix of independent product work and long-running community projects —
        with Discord bot development as an earlier chapter that still informs
        how I think about reliability and scale.
      </motion.p>

      <div className="mt-12 space-y-2">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.title}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
