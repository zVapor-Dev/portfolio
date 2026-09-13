import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks, site } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-vapor-bg/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div
        className={`${styles.paddingX} mx-auto flex max-w-6xl items-center justify-between py-4`}
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img
            src={logo}
            alt="zVapor logo"
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-lg font-semibold text-white">
            {site.handle}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-sm font-medium text-vapor-muted transition-colors hover:text-vapor-cyan"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="hidden btn-ghost !py-2 !px-4 text-xs md:inline-flex"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setToggle(!toggle)}
          aria-label={toggle ? "Close menu" : "Open menu"}
        >
          <img
            src={toggle ? close : menu}
            alt=""
            className="h-6 w-6 object-contain"
          />
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-vapor-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className={`${styles.paddingX} flex flex-col gap-4 py-6`}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-base font-medium text-vapor-muted transition-colors hover:text-white"
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="btn-primary w-full text-center"
                  onClick={() => setToggle(false)}
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
