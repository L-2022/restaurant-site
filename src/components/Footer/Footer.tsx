import React from "react";
import { motion, useInView } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { images } from "../../constants";
import "./Footer.css";

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const Footer = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
      <div ref={ref} className="app__footer section__padding app__bg" id="contact">
        <div className="app__footer-links">

          <motion.div
              className="app__footer-links_contact"
              initial={{ opacity: 0, x: -56 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: easeSmooth, delay: 0.1 }}
          >
            <h1 className="app__footer-headtext">Contact Us</h1>

            <p href="tel:+14165550198" className="p__opensans">+1 416-555-0198</p>
            <p href="mailto:contact@biliakyn.com" className="p__opensans">contact@b.com</p>
            <p className="p__opensans">
              159 King St, Toronto, ON M5V 1M1, Canada
            </p>

            <div className="footer__map">
              <iframe
                  title="restaurant_location"
                  src="https://www.google.com/maps?q=159+King+St+Toronto&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
              className="app__footer-links_logo"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easeSmooth, delay: 0.25 }}
          >
            <img src={images.logo} alt="footer_logo" />
            <p className="p__opensans">
              "The secret of success is to treat every guest as if they were a
              member of your own family."
            </p>

            <div className="app__footer-links_icons">
              <FiFacebook />
              <FiTwitter />
              <FiInstagram />
            </div>
          </motion.div>

          <motion.div
              className="app__footer-links_work"
              initial={{ opacity: 0, x: 56 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: easeSmooth, delay: 0.1 }}
          >
            <h1 className="app__footer-headtext">Working Hours</h1>
            <p className="p__opensans">Monday-Friday:</p>
            <p className="p__opensans">08:00 am - 12:00 am</p>

            <p className="p__opensans" style={{ marginTop: "10px" }}>
              Saturday-Sunday:
            </p>
            <p className="p__opensans">10:00 am - 12:00 am</p>
          </motion.div>

        </div>

        <motion.div
            className="footer__copyright"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.5 }}
        >
          <p className="p__opensans">
            {new Date().getFullYear()} Biliakyn Dining. All Rights reserved.
          </p>
        </motion.div>
      </div>
  );
};

export default Footer;
