import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { experiences } from '../constants'
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.title}
            className="w-[60%] h-[60] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px] font-semibold mx-0 my-0">
          {experience.company_name}
        </p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [loading, setLoading] = useState(false)
  const [experiences, setExperience] = useState([]);
  useEffect(() => {
    setLoading(true)
    const ExperienceData = async () => {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/experience/`
      );
      try {
        setExperience(response.data);
        setLoading(false)
        // console.log(response.data);
      } catch (err) {
        setExperience(response.data.message)
        setLoading(false)
      }
    };
    ExperienceData();
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>

      {loading ? (
          <div className="spinner-border spinner-border-sm mt-20 flex flex-col" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      ) : (
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>

      )}

    </>
  );
};

export default SectionWrapper(Experience, "work");
