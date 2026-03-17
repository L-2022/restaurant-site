import React from 'react';
import { motion, useInView } from 'framer-motion';

import { images } from '../../constants';
import './AboutUs.css';
import { scrollToSection } from "../../utils/scrollToSection";

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const AboutUs = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
      <div ref={ref} className="app__aboutus app__bg section__padding" id="about">
        <div className="app__aboutus-overlay flex__center">
          <h1 className="aboutus_overlay-letter">B</h1>
        </div>
        <div className="app__aboutus-content flex__center">
          <motion.div
              className="app__aboutus-content_about"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easeSmooth }}
          >
            <h1 className="head__text">Our Philosophy</h1>
              <p className="p__opensans">
              At Biliakyn’s, we treat every ingredient with reverence. Our culinary philosophy blends avant-garde techniques with the soul of home-grown Canadian produce.
            </p>
          </motion.div>
          <motion.div
              className="app__aboutus-content_history"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easeSmooth, delay: 0.2 }}
          >
            <h1 className="head__text">The Journey</h1>
              <p className="p__opensans">
              What started as a private tasting club in 2015 has evolved into Toronto's premier dining destination, where history meets the future on every plate.
            </p>
            </motion.div>
        </div>
      </div>
  );
};

export default AboutUs;
