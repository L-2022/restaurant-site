import React from "react";
import {motion, useInView} from "framer-motion";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {LiaAwardSolid} from "react-icons/lia";
import {awards, awardsVid} from "../../constants";
import "./Awards.css";

const easeSmooth = [0.65, 0, 0.35, 1] as const;

interface AwardProps {
    point: number;
    title: string;
    subtitle: string;
}

const AwardCard = ({
                       award: {point, title, subtitle},
                       isInView,
                       index,
                   }: {
    award: AwardProps;
    isInView: boolean;
    index: number;
}) => (
    <motion.div
        className="app__laurels_awards-card"
        initial={{opacity: 0, y: 20}}
        animate={isInView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.85, ease: easeSmooth, delay: 0.1 + index * 0.09}}
    >
        <div className="app__laurels_awards-card_icon">
            <LiaAwardSolid color="#DAC165FF" fontSize={200}/>
            <span className="p__opensans" style={{color: "#ffffff", fontWeight: 'bold'}}>
                {point}
            </span>
        </div>

        <div className="app__laurels_awards-card_content">
            <p className="p__cormorant" style={{color: "#DAC165FF"}}>
                {title}
            </p>
            <p className="p__opensans">{subtitle}</p>
        </div>
    </motion.div>
);

const Awards = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const isInView = useInView(sectionRef, {once: true, amount: 0.2});
    const [playVideo, setPlayVideo] = React.useState(false);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            video.play().catch(() => {
            });
            setPlayVideo(true);
        } else {
            video.pause();
            setPlayVideo(false);
        }
    }, [isInView]);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (playVideo) {
            video.pause();
        } else {
            video.play().catch(() => {
            });
        }
        setPlayVideo((prev) => !prev);
    };

    return (
        <div ref={sectionRef} className="app__bg app__wrapper section__padding" id="awards">
            <motion.div
                className="app__wrapper_info"
                initial={{opacity: 0, x: -48}}
                animate={isInView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 1, ease: easeSmooth}}
            >
                <h1 className="head__text">Awards</h1>

                <div className="app__laurels_awards">
                    {awards.map((award, index) => (
                        <AwardCard
                            award={award}
                            key={award.title}
                            isInView={isInView}
                            index={index}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="app__wrapper_img"
                initial={{opacity: 0, x: 48}}
                animate={isInView ? {opacity: 1, x: 0} : {}}
                transition={{duration: 1, ease: easeSmooth, delay: 0.15}}
            >
                <video ref={videoRef} src={awardsVid} loop playsInline muted controls={false}/>

                <div className="app__video-overlay flex__center">
                    <motion.div
                        className="app__video-overlay_circle flex__center"
                        onClick={handlePlayPause}
                    >
                        {playVideo ? (
                            <BsPauseFill color="#fff" fontSize={35}/>
                        ) : (
                            <BsFillPlayFill color="#fff" fontSize={35}/>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Awards;
