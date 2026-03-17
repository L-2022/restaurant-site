import React from 'react';
import { motion } from 'framer-motion';
import { GiKnifeFork, GiForkKnifeSpoon } from "react-icons/gi";
import images from '../../constants/images';
import { scrollToSection } from '../../utils/scrollToSection';
import './Navbar.css';

const navEase = [0.25, 0.46, 0.45, 0.94] as const;

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'awards', label: 'Awards' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setToggleMenu(false);
  };

  return (
      <motion.nav
          className="app__navbar"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: navEase }}
      >
        <div className="app__navbar-logo nav__pointer">
          <img src={images.logo} alt="app__logo" onClick={() => handleNavClick('home')}/>
        </div>

        <ul className="app__navbar-links nav__pointer">
          {navLinks.map((link) => (
              <li key={link.id} className="p__opensans">
                <a href={`#${link.id}`} onClick={() => handleNavClick(link.id)}>
                  {link.label}
                </a>
              </li>
          ))}
        </ul>

        <div className="app__navbar-book nav__pointer">
          <b className="p__opensans" onClick={() => handleNavClick('book')}>Book Table</b>
        </div>

        <div className="app__navbar-smallscreen nav__pointer">
          <GiForkKnifeSpoon
              color="#fff"
              style={{ transform: "rotate(270deg)" }}
              fontSize={27}
              onClick={() => setToggleMenu(true)}
          />

          {toggleMenu && (
              <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                <GiKnifeFork
                    fontSize={27}
                    className="overlay__close nav__pointer"
                    onClick={() => setToggleMenu(false)}
                />

                <ul className="app__navbar-smallscreen_links">
                  {navLinks.map((link) => (
                      <li key={link.id}>
                        <a href={`#${link.id}`} onClick={() => handleNavClick(link.id)}>
                          {link.label}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </motion.nav>
  );
};

export default Navbar;
