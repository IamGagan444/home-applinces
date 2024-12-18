import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navbarVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "About", onClick: () => navigate("/about") },
    { label: "Contact", onClick: () => navigate("/contact") },
    { label: "Login", onClick: () => navigate("/login") },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={navbarVariants}
          className="fixed top-0 inset-x-0 z-50 flex justify-center items-start cu600:pt-4"
        >
          <div className="w-full cu600:w-[80%] md:w-[70%] max-w-6xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-700 shadow-lg rounded-none cu600:rounded-full px-6 py-3 flex justify-between items-center">
            <div
              className="text-2xl font-bold text-white hover:text-yellow-500 transition-colors cursor-pointer"
              onClick={() => {
                setActiveLink("Home");
                navigate("/");
              }}
            >
              Gym <span className="text-yellow-500">Pro</span>
            </div>

            <div className="hidden cu600:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className={`text-white hover:text-yellow-500 transition-colors cursor-pointer ${
                    activeLink === link.label ? "font-bold text-yellow-500" : ""
                  }`}
                  onClick={() => {
                    setActiveLink(link.label);
                    link.onClick();
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>
            <div className="cu600:hidden block">
              <Menu />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
