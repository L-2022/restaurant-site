import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { images } from '../../constants';
import './Gallery.css';

const easeSmooth = [0.65, 0, 0.35, 1] as const;
const GALLERY_IMAGES = [images.gallery1, images.gallery2, images.gallery3, images.gallery4];
const AUTO_PLAY_INTERVAL_MS = 5000;
const TRANSITION_DURATION = 0.6;

const sliderVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: TRANSITION_DURATION, ease: easeSmooth } },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: TRANSITION_DURATION, ease: easeSmooth } }),
};

const Gallery = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const [isPaused, setIsPaused] = useState(false);
    const [[currentIndex, direction], setPage] = useState([0, 0]);
    const [showFullGallery, setShowFullGallery] = useState(false);

    const n = GALLERY_IMAGES.length;

    const paginate = useCallback((newDirection: number) => {
        setPage((prev) => {
            let nextIdx = prev[0] + newDirection * 2;
            if (nextIdx >= n) nextIdx = 0;
            if (nextIdx < 0) nextIdx = n % 2 === 0 ? n - 2 : n - 1;
            return [nextIdx, newDirection];
        });
    }, [n]);

    useEffect(() => {
        if (showFullGallery) return;
        const id = setInterval(() => { if (!isPaused) paginate(1); }, AUTO_PLAY_INTERVAL_MS);
        return () => clearInterval(id);
    }, [isPaused, paginate, showFullGallery]);

    const toggleGallery = () => setShowFullGallery(!showFullGallery);

    return (
        <div ref={ref} className={`app__gallery app__bg ${showFullGallery ? 'flex__column' : ''}`} id="gallery">
            {/* Content Section */}
            <motion.div
                className="app__gallery-content "
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, ease: easeSmooth }}
            >
                <h1 className="headtext__cormorant head__text">Gallery</h1>
                <p className="p__opensans" >
                    Explore our restaurant's atmosphere and delicious dishes through our curated gallery.
                </p>
                <button type="button" className="p__opensans gallery__view-more" onClick={toggleGallery}>
                    {showFullGallery ? 'View Less' : 'View More'}
                </button>
            </motion.div>

            {/* Images Section */}
            <div className="app__gallery-images_container">
                {!showFullGallery ? (
                    /* Slider Mode */
                    <motion.div
                        className="app__gallery-images"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="app__gallery-slider">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={sliderVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="app__gallery-slots_container"
                                >
                                    {[currentIndex, (currentIndex + 1) % n].map((idx) => (
                                        <div key={idx} className="app__gallery-images_card flex__center">
                                            <img src={GALLERY_IMAGES[idx]} alt="gallery" />
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                            <div className="app__gallery-images_arrows">
                                <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => paginate(-1)} />
                                <BsArrowRightShort className="gallery__arrow-icon" onClick={() => paginate(1)} />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* Grid Mode */
                    <motion.div
                        className="app__gallery-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="app__gallery-grid_container">
                            {GALLERY_IMAGES.map((image, index) => (
                                <div key={`grid-${index}`} className="app__gallery-images_card flex__center">
                                    <img src={image} alt="gallery" />
                                </div>
                            ))}
                        </div>
                        <button type="button" className="gallery__view-more" onClick={toggleGallery} style={{ alignSelf: 'center' }}>
                            View Less
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
