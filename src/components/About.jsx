import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
// import { services } from '../constants'
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import axios from "axios";
const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] sm:w-[230px] w-full ">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex flex-col justify-evenly items-center "
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};
 

const About = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const AboutData = async () => {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/services/`
      );
      try {
        setServices(response.data);
        // console.log(response.data);
      } catch (err) {
        setServices(response.data.message);
      }
    };
    AboutData();
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
        <div className="flex flex-row gap-5 w-30 h-30 text-[20px] lg:text-[30px] cursor-pointer">
          <a
            href="https://www.github.com/austinobravo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github "></i>
          </a>
          <a href="#">
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href={`https://web.facebook.com/Austinobravo`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          <a
            href="https://twitter.com/austinobravo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-twitter"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/austine-ebogu-27818123b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        An Official Welcome to my Portfolio - Quick one: Did you turn the Computer on your way down? if Yes, thumbs up👍  - My Name is  <a className="badge-base__link LI-simple-link" href="https://ng.linkedin.com/in/austine-ebogu-27818123b?trk=profile-badge" target="_blank"style={{color:"blue", fontWeight:900}}> Austine Ebogu,</a>  I"m a FullStack Developer and also a Technical Writer that is to say if i'm not developing and solving problem with code, I'm writing on <a href="https://smegearhosting.com" target="_blank"style={{color:"blue", fontWeight:900}}>SMEGEARHOSTING</a> where i write on anything hosting on the web. I'm grateful you've read this far, now you can go down and send me a mail on the contact form and i'll get it on my Gmail account and respond as soon as posible. Feel free to turn the ball on your way down.
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
