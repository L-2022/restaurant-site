import React from 'react';
import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollToSection';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const leftColumnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeSmooth },
  },
};

const Header = () => (
  <motion.div
    className="app__header app__wrapper section__padding"
    id="home"
    initial="hidden"
    animate="visible"
    variants={heroContainerVariants}
  >
    <motion.div className="app__wrapper_info" variants={leftColumnVariants}>

      <motion.h1 className="app__header-h1" variants={itemVariants}>
        The Art Of Fine Dining
      </motion.h1>
      <motion.p
        className="p__opensans"
        style={{ margin: '2rem 0' }}
        variants={itemVariants}
      >
        Life is too short for ordinary food. Immerse yourself in a world of gastronomic pleasure, where excellence in service meets impeccable food quality.
      </motion.p>
      <motion.div variants={itemVariants}>
        <button type="button" className="custom__button" onClick={() => scrollToSection('menu')} >View Menu</button>
      </motion.div>
    </motion.div>

    <motion.div
      className="app__wrapper_img"
      initial={{ opacity: 0, x: 48, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.35, ease: easeSmooth, delay: 0.45 }}
    >
      <motion.img
        src={images.welcome}
        alt="header_img"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeSmooth, delay: 0.55 }}
      />
    </motion.div>
  </motion.div>
);

export default Header;
