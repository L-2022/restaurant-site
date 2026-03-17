import React from 'react';
import { motion, useInView } from 'framer-motion';

import './BookTable.css';

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const BookTable = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div

            ref={ref}
            className="app__bookTable"
            initial={{ opacity: 0, y: 48 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: easeSmooth }}
            id='book'
        >
            <div className="app__bookTable-heading">
                <h1 className="head__text">Book A Table</h1>
            </div>

            <form className="app__bookTable-form">
                <div className="app__bookTable-form_group">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email Address" required />
                </div>

                <div className="app__bookTable-form_group">
                    <input type="tel" placeholder="Phone Number" required />
                    <input type="number" placeholder="Number of Guests" min="1" max="12" required />
                </div>

                <div className="app__bookTable-form_group">
                    <input type="date" required />
                    <input type="time" required />
                </div>

                <textarea placeholder="Special requests or dietary restrictions" rows={4}></textarea>

                <div className="app__bookTable-form_button flex__center">
                    <button type="submit" className="custom__button">Reserve Table</button>
                </div>
            </form>
        </motion.div>
    );
};

export default BookTable;
